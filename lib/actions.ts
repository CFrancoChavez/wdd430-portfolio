'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ProjectFormSchema = z.object({
  title: z.string().trim().min(2, 'Title must be at least 2 characters.'),
  description: z.string().trim().min(10, 'Description must be at least 10 characters.'),
  type: z.enum(['opensource', 'school']).default('school'),
  technologies: z.string().trim().min(2, 'Please provide at least one technology.'),
  link: z.string().trim().optional(),
});

function parseTechnologiesJson(rawTech: string): string {
  const list = rawTech
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  return JSON.stringify(list);
}

export async function createProject(formData: FormData) {
  const raw = {
    title: formData.get('title'),
    description: formData.get('description'),
    type: formData.get('type') || 'school',
    technologies: formData.get('technologies'),
    link: formData.get('link') || '',
  };

  const parsed = ProjectFormSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error('Invalid project input.');
  }

  const { title, description, type, technologies, link } = parsed.data;
  const techJson = parseTechnologiesJson(technologies);
  const cleanLink = link && link.length > 0 ? link : null;

  await sql`
    INSERT INTO projects (title, description, type, technologies, link)
    VALUES (
      ${title},
      ${description},
      ${type},
      ARRAY(SELECT jsonb_array_elements_text(${techJson}::jsonb)),
      ${cleanLink}
    )
  `;

  revalidatePath('/projects');
  revalidatePath('/projects/opensource');
  revalidatePath('/projects/school');
  redirect('/projects');
}

export async function updateProject(id: string, formData: FormData) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new Error('Invalid project ID.');
  }

  const raw = {
    title: formData.get('title'),
    description: formData.get('description'),
    type: formData.get('type') || 'school',
    technologies: formData.get('technologies'),
    link: formData.get('link') || '',
  };

  const parsed = ProjectFormSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error('Invalid project input.');
  }

  const { title, description, type, technologies, link } = parsed.data;
  const techJson = parseTechnologiesJson(technologies);
  const cleanLink = link && link.length > 0 ? link : null;

  await sql`
    UPDATE projects
    SET title = ${title},
        description = ${description},
        type = ${type},
        technologies = ARRAY(SELECT jsonb_array_elements_text(${techJson}::jsonb)),
        link = ${cleanLink}
    WHERE id = ${numericId}
  `;

  revalidatePath('/projects');
  revalidatePath('/projects/opensource');
  revalidatePath('/projects/school');
  redirect('/projects');
}

export async function deleteProject(id: string) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new Error('Invalid project ID.');
  }

  await sql`DELETE FROM projects WHERE id = ${numericId}`;

  revalidatePath('/projects');
  revalidatePath('/projects/opensource');
  revalidatePath('/projects/school');
}
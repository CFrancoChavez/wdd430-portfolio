'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const currentYear = new Date().getFullYear();

const CreateProjectSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters.'),
  description: z.string().trim().min(20, 'Description must be at least 20 characters.'),
  type: z.enum(['opensource', 'school']).default('school'),
  technologies: z.string().trim().min(2, 'Add at least one technology.'),
  yearCompleted: z.coerce
    .number()
    .int('Year must be a whole number.')
    .gte(2000, 'Year must be 2000 or later.')
    .lte(currentYear, `Year cannot be greater than ${currentYear}.`),
  link: z.string().trim().optional(),
});

const UpdateProjectSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters.'),
  description: z.string().trim().min(20, 'Description must be at least 20 characters.'),
  type: z.enum(['opensource', 'school']).default('school'),
  technologies: z.string().trim().min(2, 'Add at least one technology.'),
  link: z.string().trim().optional(),
});

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    type?: string[];
    technologies?: string[];
    yearCompleted?: string[];
    link?: string[];
  };
  message?: string | null;
};

function parseTechnologiesJson(rawTech: string): string {
  const list = rawTech
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  return JSON.stringify(list);
}

export async function createProject(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = CreateProjectSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    type: formData.get('type') || 'school',
    technologies: formData.get('technologies'),
    yearCompleted: formData.get('yearCompleted'),
    link: formData.get('link') || '',
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create project.',
    };
  }

  const { title, description, type, technologies, yearCompleted, link } = validatedFields.data;
  const techJson = parseTechnologiesJson(technologies);
  const cleanLink = link && link.length > 0 ? link : null;

  try {
    await sql`
      INSERT INTO projects (title, description, type, technologies, year_completed, link)
      VALUES (
        ${title},
        ${description},
        ${type},
        ARRAY(SELECT jsonb_array_elements_text(${techJson}::jsonb)),
        ${yearCompleted},
        ${cleanLink}
      )
    `;
  } catch (error) {
    console.error('Error creating project:', error);
    return {
      message: 'Database Error: Failed to create project.',
    };
  }

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

  const parsed = UpdateProjectSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    type: formData.get('type') || 'school',
    technologies: formData.get('technologies'),
    link: formData.get('link') || '',
  });

  if (!parsed.success) {
    throw new Error('Invalid project input.');
  }

  const { title, description, type, technologies, link } = parsed.data;
  const techJson = parseTechnologiesJson(technologies);
  const cleanLink = link && link.length > 0 ? link : null;

  try {
    await sql`
      UPDATE projects
      SET title = ${title},
          description = ${description},
          type = ${type},
          technologies = ARRAY(SELECT jsonb_array_elements_text(${techJson}::jsonb)),
          link = ${cleanLink}
      WHERE id = ${numericId}
    `;
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error('Failed to update project. Please try again later.');
  }

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

  try {
    await sql`DELETE FROM projects WHERE id = ${numericId}`;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project. Please try again later.');
  }

  revalidatePath('/projects');
  revalidatePath('/projects/opensource');
  revalidatePath('/projects/school');
}
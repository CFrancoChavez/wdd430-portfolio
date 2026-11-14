import { sql } from '@vercel/postgres';

export interface Project {
  id: number;
  title: string;
  description: string;
  type: 'opensource' | 'school';
  technologies: string[];
  link?: string;
}

export async function getProjects(type?: string | null): Promise<Project[]> {
  if (type) {
    const { rows } = await sql<Project>`
      SELECT * FROM projects WHERE type = ${type} ORDER BY id
    `;
    return rows;
  }
  const { rows } = await sql<Project>`SELECT * FROM projects ORDER BY id`;
  return rows;
}

export async function getProjectById(id: number): Promise<Project | null> {
  const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE id = ${id}
  `;
  return rows[0] ?? null;
}

const ITEMS_PER_PAGE = 2; // Nota: puedes cambiarlo temporalmente a 2 si tienes 3 proyectos para probar la paginación

export async function fetchFilteredProjects(
  query: string,
  currentPage: number
): Promise<Project[]> {
  const safePage = Math.max(1, Number.isFinite(currentPage) ? Math.floor(currentPage) : 1);
  const offset = (safePage - 1) * ITEMS_PER_PAGE;
  const pattern = `%${query.trim()}%`;

  const { rows } = await sql<Project>`
    SELECT * FROM projects
    WHERE title ILIKE ${pattern}
       OR description ILIKE ${pattern}
       OR array_to_string(technologies, ' ') ILIKE ${pattern}
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows;
}

export async function fetchProjectsPages(query: string): Promise<number> {
  const pattern = `%${query.trim()}%`;

  const { rows } = await sql<{ count: string }>`
    SELECT COUNT(*) AS count FROM projects
    WHERE title ILIKE ${pattern}
       OR description ILIKE ${pattern}
       OR array_to_string(technologies, ' ') ILIKE ${pattern}
  `;
  const totalCount = Number(rows[0]?.count ?? 0);
  return Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
}
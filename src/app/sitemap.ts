
import { MetadataRoute } from 'next';
import { PROJECTS, DEPARTMENTS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://harmony-os.app';

  const projectRoutes = PROJECTS.map((project: any) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(),
  }));

  const departmentRoutes = DEPARTMENTS.map((dept: any) => ({
    url: `${baseUrl}/departments/${dept.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
    },
    ...projectRoutes,
    ...departmentRoutes,
  ];
}

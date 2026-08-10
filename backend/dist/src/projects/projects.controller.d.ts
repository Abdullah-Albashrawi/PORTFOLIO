import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): Promise<{
        id: number;
        title: string;
        description: string;
        imageUrl: string;
        githubLink: string | null;
        liveLink: string | null;
        tags: string;
        createdAt: Date | null;
    }[]>;
}

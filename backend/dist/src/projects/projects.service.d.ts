export declare class ProjectsService {
    private readonly db;
    private get database();
    constructor(db: any);
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

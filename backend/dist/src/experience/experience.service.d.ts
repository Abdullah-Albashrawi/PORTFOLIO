export declare class ExperienceService {
    private readonly db;
    private get database();
    constructor(db: any);
    findAll(): Promise<{
        id: number;
        role: string;
        company: string;
        duration: string;
        description: string;
        type: "work" | "education";
        createdAt: Date | null;
    }[]>;
}

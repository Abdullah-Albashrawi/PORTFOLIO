import { ExperienceService } from './experience.service';
export declare class ExperienceController {
    private readonly experienceService;
    constructor(experienceService: ExperienceService);
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

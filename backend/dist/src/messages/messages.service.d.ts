import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesService {
    private readonly db;
    private get database();
    constructor(db: any);
    create(createMessageDto: CreateMessageDto): Promise<{
        id: number;
        name: string;
        createdAt: Date | null;
        email: string;
        message: string;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        email: string;
        message: string;
        createdAt: Date | null;
    }[]>;
}

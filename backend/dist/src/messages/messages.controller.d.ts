import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
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

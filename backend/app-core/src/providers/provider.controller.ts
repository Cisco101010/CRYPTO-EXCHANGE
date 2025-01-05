import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  NotFoundException,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/provider.dto';
import { Provider } from './schemas/provider.schema';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Chat } from './schemas/chat-schema/chat.schema';
import { Message } from './schemas/chat-schema/message.schema';
import { AuthenticatedGuard } from '../guard/auth/authenticated.guard';
import { Request } from 'express'; 

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @UseGuards(AuthenticatedGuard)
  @Post('create')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createProvider(
    @Req() req: Request, 
    @Body() createProviderDto: CreateProviderDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Provider> {
    try {
      console.log(file);
      return await this.providerService.createProvider(createProviderDto);
    } catch (error) {
      throw new InternalServerErrorException('Error creating provider: ' + error.message);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('all')
  async findAllProviders(@Req() req: Request): Promise<Provider[]> {
    try {
      return await this.providerService.findAllProviders();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching providers: ' + error.message);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('find/:email')
  async findProviderByEmail(@Param('email') email: string, @Req() req: Request): Promise<Provider> {
    try {
      const provider = await this.providerService.findProviderByEmail(email);
      if (!provider) {
        throw new NotFoundException(`Provider with email ${email} not found`);
      }
      return provider;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching provider: ' + error.message);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Post('chat/open')
  async openChat(
    @Body('userEmail') userEmail: string,  
    @Body('providerEmail') providerEmail: string,
    @Req() req: Request, 
  ): Promise<{ chat: Chat }> { 
    try {
      return await this.providerService.openChat(userEmail, providerEmail); 
    } catch (error) {
      throw new InternalServerErrorException('Error opening chat: ' + error.message);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Post('chat/send')
  async sendMessage(
    @Body('senderEmail') senderEmail: string,
    @Body('chatId') chatId: string,
    @Body('messageContent') messageContent: string,
    @Req() req: Request, 
  ): Promise<Message> {
    try {
      return await this.providerService.sendMessage(senderEmail, chatId, messageContent);
    } catch (error) {
      throw new InternalServerErrorException('Error sending message: ' + error.message);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Post('chat/send-as-provider')
  async sendMessageAsProvider(
    @Body('providerEmail') providerEmail: string,
    @Body('chatId') chatId: string,
    @Body('messageContent') messageContent: string,
    @Req() req: any, // Cambiar el tipo de Request a any para incluir la propiedad user
  ): Promise<Message> {
    try {
      const userEmail = req.user.email; // Obtener el email del usuario de la sesión actual
      return await this.providerService.sendMessageAsProvider(providerEmail, chatId, messageContent, userEmail);
    } catch (error) {
      throw new InternalServerErrorException('Error sending message as provider: ' + error.message);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('chat/messages/:chatId')
  async getMessages(@Param('chatId') chatId: string, @Req() req: Request): Promise<Message[]> {
    try {
      return await this.providerService.getMessages(chatId);
    } catch (error) {
      throw new InternalServerErrorException('Error fetching messages: ' + error.message);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('chat/details-by-email/:email')
  async getChatDetailsByEmail(@Param('email') email: string, @Req() req: Request): Promise<any> {
    try {
      const chatDetails = await this.providerService.getChatDetailsByEmail(email);
      if (!chatDetails) {
        throw new NotFoundException('No chats found for this user');
      }
      return chatDetails;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching chat details: ' + error.message);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('chat/messages-as-provider/:providerEmail')
  async getMessagesAsProvider(
    @Param('providerEmail') providerEmail: string,
    @Req() req: Request
  ): Promise<any[]> {
    try {
      return await this.providerService.getMessagesAsProvider(providerEmail);
    } catch (error) {
      throw new InternalServerErrorException('Error fetching messages as provider: ' + error.message);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('chat/messages-as-user/:userEmail')
  async getMessagesAsUser(
    @Param('userEmail') userEmail: string,
    @Req() req: Request
  ): Promise<any[]> {
    try {
      return await this.providerService.getMessagesAsUser(userEmail);
    } catch (error) {
      throw new InternalServerErrorException('Error fetching messages as user: ' + error.message);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Post('chat/send-as-user')
  async sendMessageAsUser(
    @Body('userEmail') userEmail: string,
    @Body('chatId') chatId: string,
    @Body('messageContent') messageContent: string,
    @Req() req: Request, 
  ): Promise<Message> {
    try {
      return await this.providerService.sendMessageAsUser(userEmail, chatId, messageContent);
    } catch (error) {
      throw new InternalServerErrorException('Error sending message as user: ' + error.message);
    }
  }
}
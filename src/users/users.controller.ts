import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupUserDto } from './dto/signup.dto';
import { LoginUserDto } from './dto/login.dto';
import { CreateTodoDto } from 'src/todos/dto/create-todo.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/signup')
  signup(@Body() signupInfo: SignupUserDto) {
    return this.userService.createAcount(signupInfo);
  }

  @Post('/login')
  login(@Body() loginInfo: LoginUserDto) {
    return this.userService.connection(loginInfo);
  }
  @Post('createTodo/:userId')
  createTodo(
    @Param('userId') userId: string,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    return this.userService.createTodo(userId, createTodoDto);
  }
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
}

import { DynamicModule, Module } from '@nestjs/common';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { NODE_ENV } from 'src/shared/constants/env';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassModule } from './class/class.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './middleware/auth/auth.module';
import { ProgressModule } from './progress/progress.module';
import { LessonModule } from './lesson/lesson.module';
import { TaskModule } from './task/task.module';

declare const module: any;

@Module({
  imports: [
    ClassModule,
    ProgressModule,
    LessonModule,
    TaskModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  public static initialize(): DynamicModule {
    const renderModule =
      module.hot?.data?.renderModule ??
      RenderModule.forRootAsync(Next({ dev: NODE_ENV === 'development' }), {
        viewsDir: null,
      });

    if (module.hot) {
      module.hot.dispose((data: any) => {
        data.renderModule = renderModule;
      });
    }

    return {
      module: AppModule,
      imports: [renderModule],
      controllers: [AppController],
      providers: [AppService],
    };
  }
}

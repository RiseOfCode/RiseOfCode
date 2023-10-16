import { Controller } from '@nestjs/common';
import { ClassService } from './class.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('class')
@Controller('class')
export class ClassController {
  constructor(private classService: ClassService) {}
}

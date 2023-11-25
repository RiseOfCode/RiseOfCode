export {};
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';
// import { parse } from 'node-html-parser';
// import { ContesterSubmitDto } from './dto/contester.submit.dto';
// import {
//   ContesterResultDataDto,
//   ContesterResultDto,
// } from './dto/contester.result.dto';
// import { $Enums } from '.prisma/client';
// import TaskStatus = $Enums.TaskStatus;
// import * as process from 'process';
//
// @Injectable()
// export class ContesterService {
//   constructor(private prisma: PrismaService) {}
//   private COOKIE = process.env.COOKIE;
//
//   async solve(userId: string, taskId: string, code: string) {
//     const task = await this.prisma.task.findUniqueOrThrow({
//       where: {
//         id: taskId,
//       },
//       include: {
//         tests: true,
//       },
//     });
//     let solving = await this.prisma.taskSolving.findFirst({
//       where: {
//         user_id: userId,
//         task_id: taskId,
//       },
//     });
//     if (solving == null)
//       solving = await this.prisma.taskSolving.create({
//         data: {
//           user_id: userId,
//           task_id: taskId,
//         },
//       });
//     const attempt = await this.prisma.solvingAttempt.create({
//       data: {
//         task_solving_id: solving.id,
//         task_status: TaskStatus.PROCESSING,
//         comment: '',
//       },
//     });
//     if (this.COOKIE == null) this.COOKIE = '';
//     const response = await fetch(
//       'https://compilers.widgets.sphere-engine.com/35c21987d371b1d8687aab249a3c332e',
//       {
//         method: 'GET',
//         headers: {
//           Cookie: this.COOKIE,
//         },
//       },
//     );
//
//     const html = parse(await response.text());
//     const token = html
//       .querySelector('input[name="widget_form[_token]"]')
//       .getAttribute('value');
//
//     task.tests.forEach(async (test) => {
//       const result = await this.runTest(token, code, test.input);
//       const status = await this.chooseAndUpdateStatus(
//         attempt.id,
//         result.data[0],
//         test.output,
//       );
//       if (status != TaskStatus.SOLVED) return;
//     });
//
//     await this.prisma.solvingAttempt.update({
//       where: {
//         id: attempt.id,
//       },
//       data: {
//         task_status: TaskStatus.SOLVED,
//       },
//     });
//   }
//
//   async runTest(
//     token: string | undefined,
//     code: string,
//     input: string,
//   ): Promise<ContesterResultDto> {
//     const form = new URLSearchParams();
//     form.append('widget_form[custom_data]', '');
//     form.append('widget_form[time_limit]', '5');
//     if (token != null) form.append('widget_form[_token]', token);
//     form.append('widget_form[source]', code);
//     form.append('widget_form[compiler]', '22');
//     form.append('widget_form[input]', input);
//
//     if (this.COOKIE == null) this.COOKIE = '';
//     const submitResponse = await fetch(
//       'https://compilers.widgets.sphere-engine.com/_submit/35c21987d371b1d8687aab249a3c332e',
//       {
//         method: 'POST',
//         body: form,
//         headers: {
//           Cookie: this.COOKIE,
//         },
//       },
//     );
//     const submitResult = (await submitResponse.json()) as ContesterSubmitDto;
//
//     let statusResult = new ContesterResultDto();
//     while (statusResult.data[0].executing) {
//       const statusResponse = await fetch(
//         `https://compilers.widgets.sphere-engine.com/_statuses/35c21987d371b1d8687aab249a3c332e/${submitResult.data.id}`,
//         {
//           method: 'GET',
//         },
//       );
//       statusResult = (await statusResponse.json()) as ContesterResultDto;
//     }
//     return statusResult;
//   }
//
//   async chooseAndUpdateStatus(
//     attemptId: string,
//     result: ContesterResultDataDto,
//     output: string,
//   ): Promise<TaskStatus> {
//     switch (result.status) {
//       case 15: {
//         if (result.output.data == output) return TaskStatus.SOLVED;
//         else {
//           await this.prisma.solvingAttempt.update({
//             where: {
//               id: attemptId,
//             },
//             data: {
//               task_status: TaskStatus.WRONG_ANSWER_ERROR,
//               comment: 'An incorrect answer was received on one of the tests',
//             },
//           });
//           return TaskStatus.WRONG_ANSWER_ERROR;
//         }
//       }
//       case 13: {
//         await this.prisma.solvingAttempt.update({
//           where: {
//             id: attemptId,
//           },
//           data: {
//             task_status: TaskStatus.TIME_LIMIT_ERROR,
//             comment:
//               'Your program failed to finish within the time limit (5 seconds)',
//           },
//         });
//         return TaskStatus.TIME_LIMIT_ERROR;
//       }
//       case 11: {
//         await this.prisma.solvingAttempt.update({
//           where: {
//             id: attemptId,
//           },
//           data: {
//             task_status: TaskStatus.COMPILATION_ERROR,
//             comment: result.cmpinfo.data,
//           },
//         });
//         return TaskStatus.COMPILATION_ERROR;
//       }
//     }
//     return TaskStatus.SOLVED;
//   }
// }

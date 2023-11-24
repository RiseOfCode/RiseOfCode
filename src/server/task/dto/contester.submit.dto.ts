export class ContesterSubmitDto {
  constructor() {
    this.result = false;
    this.errors = [];
    this.message = '';
    this.data = new ContesterSubmitDataDto();
  }

  result: boolean;
  errors: string[];
  message: string;
  data: ContesterSubmitDataDto;
}

export class ContesterSubmitDataDto {
  constructor() {
    this.id = '';
    this.api_id = 0;
    this.language_id = 22;
  }

  id: string;
  api_id: number;
  language_id: number;
}

export class ContesterResultDto {
  constructor() {
    this.result = false;
    this.data = [new ContesterResultDataDto()];
  }

  result: boolean;
  data: ContesterResultDataDto[];
}

export class ContesterResultDataDto {
  constructor() {
    this.id = 0;
    this.api_id = 0;
    this.status = 0;
    this.executing = true;
    this.signal = new ContesterSignalDto();
    this.time = 0;
    this.memory = 0;
    this.input = new ContesterResultContentDto();
    this.output = new ContesterResultContentDto();
    this.error = new ContesterResultContentDto();
    this.cmpinfo = new ContesterResultContentDto();
  }

  id: number;
  api_id: number;
  status: number;
  executing: boolean;
  signal: ContesterSignalDto;
  time: number;
  memory: number;
  input: ContesterResultContentDto;
  output: ContesterResultContentDto;
  error: ContesterResultContentDto;
  cmpinfo: ContesterResultContentDto;
}

export class ContesterResultContentDto {
  constructor() {
    this.data = '';
    this.isHtml = false;
    this.originSize = 0;
    this.size = 0;
    this.isFull = false;
  }

  data: string;
  isHtml: boolean;
  originSize: number;
  size: number;
  isFull: boolean;
}

export class ContesterSignalDto {
  constructor() {
    this.number = 0;
  }

  number: number;
}

export class ResponseBody {
  message: string;
  data: unknown;

  constructor(message: string, data: unknown) {
    this.message = message;
    this.data = data;
  }

  static success(data: unknown): ResponseBody {
    return {
      message: 'Success',
      data: data,
    };
  }

  static error(data: unknown): ResponseBody {
    return {
      message: 'failed',
      data: data,
    };
  }

  static invalidParam(param: string): ResponseBody {
    return {
      message: `Invalid Parameters (${param})`,
      data: null,
    };
  }

  static missingParam(param: string): ResponseBody {
    return {
      message: `Missing Parameters (${param})`,
      data: null,
    };
  }

  static notFound(what: string): ResponseBody {
    return {
      message: `${what} Not Found`,
      data: null,
    };
  }

  static internalError(): ResponseBody {
    return {
      message: 'Internal Error',
      data: null,
    };
  }
}

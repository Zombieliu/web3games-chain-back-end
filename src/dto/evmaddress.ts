import { Rule, RuleType } from "@midwayjs/validate";

export class UserDTO {
  @Rule(RuleType.number().required())
  address: number;

  @Rule(RuleType.string().required())
  firstName: string;

  @Rule(RuleType.string().max(10))
  lastName: string;

  @Rule(RuleType.number().max(60))
  age: number;
}

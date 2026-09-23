import { CronExpressionParser } from "cron-parser";
import cronstrue from "cronstrue";

export const describeCron = (expr: string) => cronstrue.toString(expr.trim(), { use24HourTimeFormat: false });

export const nextRuns = (expr: string, count = 5, from = new Date()) =>
  CronExpressionParser.parse(expr.trim(), { currentDate: from })
    .take(count)
    .map((d) => d.toDate());

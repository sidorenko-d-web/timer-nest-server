import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt.guard";

const Auth = () => UseGuards(JwtAuthGuard)
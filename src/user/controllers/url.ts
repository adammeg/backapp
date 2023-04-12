import { Controller, Get, Headers,Param, Query } from "@nestjs/common";

@Controller("users")
export class UsersController {
  // @Example 1: Headers Params Object
  @Get("headers")
  getHeaders(
    @Query('email') email: string,
    @Query('name') name: string,
  ): string {
    return `User with email +${email} + and name +${name}+ found.`;
  }
/**
 *   // @Example 2: Extract `User-Agent` header from Headers Object
  @Get("runtime")
  getRuntime(@Headers("User-Agent") ua: string) {
    console.log(ua);
    return { runtime: ua };
  }

  // @Example 3: Extract multiple headers from Headers Object
  @Get("multi-headers")
  getRuntimeAndCache(
    @Headers("User-Agent") ua: string,
    @Headers("Cache-Control") cache: string
  ) {
    return { runtime: ua, cacheControl: cache };
  }
 */

}
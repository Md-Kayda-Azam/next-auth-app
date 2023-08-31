import { connect } from "@/database/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/validators/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validators/errorRepoter";
import { User } from "@/model/User";
import { checkPassword } from "@/app/helper/hashPassword";

// for DB connection
connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validator = vine.compile(loginSchema);

    validator.errorReporter = () => new ErrorReporter();

    const output = await validator.validate(body);

    const user = await User.findOne({ email: output.email });
    if (!user) {
      return NextResponse.json(
        {
          email:
            "No account found with this email! Please enter your valid email",
        },
        { status: 400 }
      );
    }

    const password = checkPassword(output.password, user.password);

    if (!password) {
      return NextResponse.json(
        {
          password: "Password not match. Please enter your valid password",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "User loggedIn successfully", payload: user },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(error.messages, { status: 400 });
    }
  }
}

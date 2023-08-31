import { connect } from "@/database/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/validators/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validators/errorRepoter";
import { hashPassword } from "@/app/helper/hashPassword";
import { User } from "@/model/User";

// + for DB connection
connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validator = vine.compile(registerSchema);

    validator.errorReporter = () => new ErrorReporter();

    const output = await validator.validate(body);

    const user = await User.findOne({ email: output.email });

    if (user) {
      return NextResponse.json(
        {
          status: 400,
          email: {
            error: "Email already axits!  Please use anthers email.",
          },
        },
        { status: 200 }
      );
    }

    // Encrypt the password
    hashPassword(output);
    await User.create(output);
    return NextResponse.json(
      {
        status: 200,
        message: "User created successfully. Please login to your account.",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, error: error.messages },
        { status: 200 }
      );
    }
  }
}

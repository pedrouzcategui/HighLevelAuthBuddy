import { HTTP_CODES } from "@/lib/http";
import { resend } from "@/lib/mailing";

export type RequestPasswordRecoveryPayload = {
  email: string;
};

export async function POST(request: Request) {
  try {
    const { email }: RequestPasswordRecoveryPayload = await request.json();

    const { data, error } = await resend.emails.send({
      // TODO: set custom domain as env var?
      from: "alfredoprograma.dev@alfredoprograma.dev",
      to: [email],
      subject: "Password recovery",
      // TODO: create React template for mail
      html: "<p>Recover your lost password</p>",
    });

    // Go to catch block
    // TODO: Maybe handle error here and return custom response?
    if (error) {
      throw new Error(error.message);
    }

    console.log(data);

    return Response.json(
      {
        message: `Recovery password link has been sent to ${email} successfully `,
      },
      {
        status: HTTP_CODES.OK,
      },
    );
  } catch (err) {
    console.error(err);

    return Response.json(
      { message: "Internal server error" },
      { status: HTTP_CODES.INTERNAL_SERVER_ERROR },
    );
  }
}

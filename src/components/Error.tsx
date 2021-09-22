export class loginException {
  constructor() {}

  static errorValue = (error: { code: string; message: string }) => {
    switch (error.code) {
      case "auth/user-not-found":
        // TODO 로그인 페이지로 이동
        alert("유저정보가 없습니다. 회원가입 후 이용해주세요");
        break;
      case "auth/wrong-password":
        alert("비밀번호가 잘못되었습니다. 다시 시도해주세요");
        break;
      default:
        console.log(error);
        break;
    }

    return error.message;
  };
}

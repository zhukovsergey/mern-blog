import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side */}
        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 lounded-lg text-white rounded-md">
              Zh blog
            </span>
          </Link>
          <p className="text-sm mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            commodi saepe sit nisi dolorem ullam voluptatem nemo. Sed mollitia
            soluta ex quibusdam molestias in, atque laborum provident ipsam
            inventore tempora!
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div className="">
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div className="">
              <Label value="Your email" />
              <TextInput type="text" placeholder="email" id="email" />
            </div>
            <div className="">
              <Label value="Your password" />
              <TextInput type="text" placeholder="password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>У вас есть аккаунт?</span>
            <Link to="/sign-in" className="text-blue-500">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

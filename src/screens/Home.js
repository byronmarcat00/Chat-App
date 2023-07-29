import * as React from "react";
import MyText from "../components/MyText";
import MyButton from "../components/MyButton";
import { Auth } from "aws-amplify";
import ListTodos from "../components/ListTodos";


export default function Home() {
  

  return (
    <React.Fragment>
<ListTodos/>
    </React.Fragment>
  );
}
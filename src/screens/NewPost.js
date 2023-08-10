import * as React from "react";
import Mytext from "../components/MyText";
import { View } from "../components/themed/Themed";

export default function NewPost(){

    return (
        <View>
            <Mytext type="caption">
                What are you thinking?
            </Mytext>
        </View>

    )
}
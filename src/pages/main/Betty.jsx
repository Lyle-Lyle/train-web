import {Button} from "antd";
import {useState} from "react";


const Betty = () => {


    const [count, setCount] = useState(0)
    const onConfirm = () => {
        setCount((count) => count = count + 1)
    }

    return (
        <div>
            <p>被骂次数：{count}</p>
            <Button onClick={onConfirm}>被骂</Button>
        </div>
    )
}

export default Betty
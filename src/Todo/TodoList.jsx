import React from "react";
import { StyleSheet,css } from "aphrodite";
import { TodoListItem } from "./TodoListItem";

export const TodoList = ({list}) => {
    return(
        <ul className={css(styles.container)}>
            {list.map((item,index) => (
                <TodoListItem 
                    item={item}
                    key={index} 
                    />
                ))}
        </ul>
    )
}

const styles = StyleSheet.create({
    container: {
        display:'flex',
        background: '#ECF0F1',
        borderRadius:'0.5rem',
        justifyContent:'flex-start',
        padding:'0.5rem',
        flexDirection:'column'
    }
})
/**
 * Created by Jsceoz on 2016/11/9.
 */



export const SELECT_ITEM = 'SELECT_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';


export function selectItem(id) {
    return {
        type:SELECT_ITEM,
        id
    };
}

export function deleteItem(id) {

}
import { useRef } from "react";


export function useOnDraw(onDraw){

    const boardRef =useRef(null);

    const isDrawingRef = useRef(false);

    const mouseMoveListenerRef = useRef(null);
    const mouseDownListenerRef = useRef(null);
    const mouseUpListenerRef = useRef(null);

    function setBoardRef(ref){
        if(!ref) return ;
        boardRef.current = ref;
        initMouseMoveListener();
        initMouseDownListener();
        initMouseUpListener();
    }

    function initMouseMoveListener(){
        const mouseMoveListener=(e)=>{
            if(isDrawingRef.current){
                const point= computePointInBoard(e.clientX, e.clientY);
                const ctx = boardRef.current.getContext('2d');
                if(onDraw) onDraw(ctx, point);
                console.log('point: ', point);
            }
        }
        mouseMoveListenerRef.current = mouseMoveListener;
        window.addEventListener("mousemove", mouseMoveListener);
    }

    function initMouseUpListener(){
        const listener=()=>{
            isDrawingRef.current = false;
        }
        mouseUpListenerRef.current = listener;
        window.addEventListener("mouseup", listener)
    }
    
    function initMouseDownListener(){
        if(!boardRef.current) return ;
        const listener = ()=>{
            isDrawingRef.current = true
        }
        mouseDownListenerRef.current = listener;
        boardRef.current.addEventListener("mousedown", listener);
    }

    function computePointInBoard(clientX, clientY){
        if(boardRef.current){
            const boundingRect = boardRef.current.getBoundingClientRect();
            return {
                x : clientX - boundingRect.left,
                y : clientY - boundingRect.top
            }
        }else{
            return null;
        }
    }

    return setBoardRef;
}
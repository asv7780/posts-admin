
export default function debounce(a,b,c){
    let d, e;
    return function(){
        const f=this;
        const g=arguments;

        function h(){
            d=null;
            c||(e=a.apply(f,g));
        }

        return (clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e)
    }
}

export function removeHTMLTags (str) {
    return str.replace(/<[^>]*>?/gm, '');
}

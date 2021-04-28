export function canvas2png(canvas:HTMLCanvasElement) {
    // return new Promise((resolve)=>{
    //     canvas.toBlob((blob)=>{
    //         let filename = `${new Date().toISOString()}.png`;
    //         let link = document.createElement('a');
    //         link.href = URL.createObjectURL(blob);
    //         link.download = filename;            
    //         link.click();
    //     })
    // })
    return canvas.toBlob((blob)=>{
        let filename = `${new Date().toISOString()}.png`;
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    })
}
class Canvas2dGraphics {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }

    Init = function (canvas) {
        if (canvas != null && canvas != undefined) {
            this.context = canvas.getContext("2d");
        }
    };

    SetContext = function (ctx) {
        this.context = ctx;
    };

    Background = function (backgroundColor) {
        //this.Init(canvas);
        this.context.beginPath();
        this.context.fillStyle = backgroundColor;
        this.context.fillRect(0, 0, canvas.width, canvas.height);
        this.context.closePath();
    };
    Background = function () {
        this.context.beginPath();
        this.context.fillStyle = "#000";
        this.context.fillRect(0, 0, canvas.width, canvas.height);
        this.context.closePath();
    };
    //Clear function
    ClearCanvas = function (x, y, w, h) {
        this.context.beginPath();
        this.context.clearRect(x, y, w, h);
        this.context.closePath();
    };

    //Translate canvas
    Translate = function (x, y) {
        this.context.translate(x, y);
    }

    //Rotate canvas
    Rotate=function(angel){
        this.context.rotate(angel);
    }

    //Save canvas
    Save = function () {
        this.context.save();
    }

    //Restore canvas
    Restore = function () {
        this.context.restore();
    }

    //Stroke graphs
    //Stroke Text
    StrokeText = function (text, x, y,strokeColor,lineWidth, fontSizeAndfontStyle) {
        {
            try {
                this.context.beginPath();
                if(fontSizeAndfontStyle !=undefined || fontSizeAndfontStyle !=null || fontSizeAndfontStyle.length!=0){
                    this.context.font=fontSizeAndfontStyle;
                }
                if(strokeColor !=undefined || strokeColor !=null || strokeColor.length!=0){
                    this.context.strokeStyle=strokeColor;
                }
                if(lineWidth !=undefined || lineWidth != null || lineWidth.length!=0){
                    this.context.lineWith=lineWidth;
                }
                
                this.context.strokeText(text, x, y);
                this.context.closePath();
            } catch (err) {
                console.error('Stroke Text - ' + new Error(err));
            }
        }
    };

    // Draw Line on canvas
    StrokeLine = function (x0, y0, x1, y1, strokeColor, lineWidth) {
        try {
            if (strokeColor != null && strokeColor.length != 0) {
                this.context.strokeStyle = strokeColor;
            } else {
                this.context.strokeStyle = "#fff";
            }

            if (lineWidth != null && lineWidth.length != 0) {
                this.context.lineWidth = lineWidth;
            }
            this.context.beginPath();
            this.context.moveTo(x0, y0);
            this.context.lineTo(x1, y1);
            this.context.stroke();
            this.context.closePath();
        } catch (err) {
            console.error("StrokeTriangle - " + new Error(err));
        }
    };

    //Draw stroke triangle
    StrokeTriangle = function (x0, y0, x1, y1, x2, y2, strokeColor, lineWidth) {
        try {
            if (strokeColor != null && strokeColor.length != 0) {
                this.context.strokeStyle = strokeColor;
            } else {
                this.context.strokeStyle = "#fff";
            }

            if (lineWidth != null && lineWidth.length != 0) {
                this.context.lineWidth = lineWidth;
            }
            this.context.beginPath();
            this.context.moveTo(x0, y0);
            this.context.lineTo(x1, y1);
            this.context.lineTo(x2, y2);
            this.context.lineTo(x0, y0);
            this.context.stroke();
            this.context.closePath();
        } catch (err) {
            console.error("StrokeTriangle - " + new Error(err));
        }
    };

    //Draw stroke rectangle
    StrokeRectangle = function (x, y, width, height, strokeColor, lineWidth) {
        try {
            this.context.save();
            if (strokeColor != null && strokeColor.length != 0) {
                this.context.strokeStyle = strokeColor;
            } else {
                this.context.strokeStyle = "#fff";
            }

            if (lineWidth != null && lineWidth.length != 0) {
                this.context.lineWidth = lineWidth;
            }
            this.context.beginPath();
            this.context.strokeRect(x, y, width, height);
            this.context.closePath();
            this.context.restore();
        } catch (err) {
            console.error("StrokeRectangle - " + new Error(err));
        }
    };

    //Draw stroke Polygon
    StrokePolygon = function (x, y, n, radius, strokeColor, lineWidth) {
        try {
            if (n < 3) {
                return;
            }
            let angleBetween = 360 / n;
            this.context.save();

            for (let i = 0; i < n + 1; i++) {
                let x0 = x + radius * Math.cos((i * angleBetween * Math.PI) / 180);
                let y0 = y + radius * Math.sin((i * angleBetween * Math.PI) / 180);

                let x1 =
                    x + radius * Math.cos(((i + 1) * angleBetween * Math.PI) / 180);
                let y1 =
                    y + radius * Math.sin(((i + 1) * angleBetween * Math.PI) / 180);
                this.StrokeLine(
                    x0,
                    y0,
                    x1,
                    y1,
                    strokeColor != null ? strokeColor : "#fff",
                    lineWidth != null ? lineWidth : 3
                );
            }
            this.context.restore();
        } catch (err) {
            console.error("StrokePolygon - " + new Error(err));
        }
    };

    //Draw stroke circle
    StrokeCircle = function (
        x,
        y,
        radius,
        startAngle,
        endAngle,
        direction,
        strokeColor,
        lineWidth
    ) {
        try {
            this.context.save();
            if (strokeColor != null && strokeColor.length != 0) {
                this.context.strokeStyle = strokeColor;
            } else {
                this.context.strokeStyle = "#fff";
            }

            if (lineWidth != null && lineWidth.length != 0) {
                this.context.lineWidth = lineWidth;
            }

            this.context.beginPath();
            this.context.arc(x, y, radius, startAngle, endAngle, direction);
            this.context.stroke();
            this.context.closePath();
            this.context.restore();
        } catch (err) {
            console.error("StrokeCircle - " + new Error(err));
        }
    };

    //Draw stroke Ellipse
    StrokeEllipse = function (
        x,
        y,
        radiusX,
        radiusY,
        rotation,
        startAngle,
        endAngle,
        direction,
        strokeColor,
        lineWidth
    ) {
        try {
            this.context.save();
            if (strokeColor != null && strokeColor.length != 0) {
                this.context.strokeStyle = strokeColor;
            } else {
                this.context.strokeStyle = "#fff";
            }

            if (lineWidth != null && lineWidth.length != 0) {
                this.context.lineWidth = lineWidth;
            }

            this.context.beginPath();
            this.context.ellipse(
                x,
                y,
                radiusX,
                radiusY,
                rotation,
                startAngle,
                endAngle,
                direction
            );
            this.context.stroke();
            this.context.closePath();
            this.context.restore();
        } catch (err) {
            console.error("StrokeEllipse - " + new Error(err));
        }
    };

    //Fill graphs
    //Fill Text
    FillText = function (text, x, y,fillColor, fontSizeAndfontStyle) {
        {
            try {
                this.context.beginPath();
                if(fontSizeAndfontStyle !=undefined || fontSizeAndfontStyle !=null || fontSizeAndfontStyle.length!=0){
                    this.context.font=fontSizeAndfontStyle;
                }
                if(fillColor !=undefined || fillColor !=null || fillColor.length!=0){
                    this.context.fillStyle=fillColor;
                }
                
                this.context.fillText(text, x, y);
                this.context.closePath();
            } catch (err) {
                console.error('Stroke Text - ' + new Error(err));
            }
        }
    };

    //Fill Triangle
    FillTriangle = function (x0, y0, x1, y1, x2, y2, fillColor) {
        try {
            this.context.save();
            if (fillColor != null && fillColor.length != 0) {
                this.context.fillStyle = fillColor;
            } else {
                this.context.strokeStyle = "#fff";
            }

            this.context.beginPath();
            this.context.moveTo(x0, y0);
            this.context.lineTo(x1, y1);
            this.context.lineTo(x2, y2);
            this.context.lineTo(x0, y0);
            this.context.fill();
            this.context.closePath();
            this.context.restore();
        } catch (err) {
            console.error("StrokeTriangle - " + new Error(err));
        }
    };

    //Fill Polygon
    FillPolygon = function (x, y, n, radius, fillColor) {
        try {
            if (n < 3) {
                return;
            }
            let angleBetween = 360 / n;
            this.context.save();
            if (fillColor != null && fillColor.length != 0) {
                this.context.strokeStyle = fillColor;
            } else {
                this.context.strokeStyle = "#fff";
            }
            if (fillColor != null && fillColor.length != 0) {
                this.context.fillStyle = fillColor;
            } else {
                this.context.fillStyle = "#fff";
            }

            let x0 = x + radius * Math.cos((0 * angleBetween * Math.PI) / 180);
            let y0 = y + radius * Math.sin((0 * angleBetween * Math.PI) / 180);
            this.context.moveTo(x0, y0);
            for (let i = 0; i < n + 1; i++) {
                if (i != 0) {
                    x0 = x + radius * Math.cos((i * angleBetween * Math.PI) / 180);
                    y0 = y + radius * Math.sin((i * angleBetween * Math.PI) / 180);
                }

                let x1 =
                    x + radius * Math.cos(((i + 1) * angleBetween * Math.PI) / 180);
                let y1 =
                    y + radius * Math.sin(((i + 1) * angleBetween * Math.PI) / 180);
                this.context.lineTo(x0, y0);
                this.context.lineTo(x1, y1);
                //this.context.stroke();
                if (i == n - 1) {
                    this.context.closePath();
                    this.context.fill();
                }

                //this.StrokeLine(x0,y0,x1,y1,fillColor!=null?fillColor:"#fff");
            }
            this.context.restore();
        } catch (err) {
            console.error("StrokePolygon - " + new Error(err));
        }
    };

    //Fill rectangle
    FillRectangle = function (x, y, width, height, fillColor) {
        try {
            if (fillColor != null && fillColor.length != 0) {
                this.context.fillStyle = fillColor;
            } else {
                this.context.fillStyle = "#fff";
            }
            this.context.beginPath();
            this.context.fillRect(x, y, width, height);
            this.context.closePath();
        } catch (err) {
            console.error("StrokeTriangle - " + new Error(err));
        }
    };

    //Fill Ellipse
    FillEllipse = function (
        x,
        y,
        radiusX,
        radiusY,
        rotation,
        startAngle,
        endAngle,
        direction,
        fillColor
    ) {
        try {
            this.context.save();
            if (fillColor != null && fillColor.length != 0) {
                this.context.fillStyle = fillColor;
            } else {
                this.context.fillStyle = "#fff";
            }

            this.context.beginPath();
            this.context.ellipse(
                x,
                y,
                radiusX,
                radiusY,
                rotation,
                startAngle,
                endAngle,
                direction
            );
            this.context.closePath();
            this.context.fill();
            this.context.restore();
        } catch (err) {
            console.error("StrokeEllipse - " + new Error(err));
        }
    };

    //Fill Circle
    FillCircle = function (
        x,
        y,
        radius,
        startAngle,
        endAngle,
        direction,
        fillColor
    ) {
        try {
            this.context.save();
            if (fillColor != null && fillColor.length != 0) {
                this.context.fillStyle = fillColor;
            } else {
                this.context.fillStyle = "#fff";
            }

            this.context.beginPath();
            this.context.arc(x, y, radius, startAngle, endAngle, direction);
            this.context.fill();
            this.context.closePath();
            this.context.restore();
        } catch (err) {
            console.error("StrokeCircle - " + new Error(err));
        }
    };

    //Image draw
    DrawImage(Image, x, y){
        try{
            if(Image !=undefined && Image.length !=0 ){
                this.context.beginPath();
                this.context.drawImage(Image, x, y);
                this.context.closePath();
            }
        }catch(err){
            console.error('Draw Image - '+new Error(err));
        }
    };
    //Draw Image with x, y position and with & height
    DrawImageWH(Image, x, y, width, height){
        try{
            if(Image !=undefined && Image.length !=0 ){
                this.context.beginPath();
                this.context.drawImage(Image, x, y,width, height);
                this.context.closePath();
            }
        }catch(err){
            console.error('Draw Image - '+new Error(err));
        }
    };
    //Draw Image with clipped sx, sy, s-width, s-height
    DrawImageClipped(Image, sx, sy, sWidth, sHeight, x, y, width, height){
        try{
            if(Image !=undefined && Image.length !=0 ){
                this.context.beginPath();
                this.context.drawImage(Image, sx, sy,sWidth, sHeight, x, y, width, height);
                this.context.closePath();
            }
        }catch(err){
            console.error('Draw Image - '+new Error(err));
        }
    };

}

//Export the Canvas2dGraphics class
export {
    Canvas2dGraphics
};
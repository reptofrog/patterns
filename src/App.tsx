import React from 'react'
import styled from 'styled-components';
import Deck from './components/Deck';


globalThis.currentShape = 'square';
globalThis.currentColor = '#000000';

class App extends React.Component {
    state = {
        'strokes': [],
        'redoQueue': []
    };


    canvasRef = React.createRef();
    previewRef = React.createRef();

    drawShape = (pos, shape, color) => {
        const canvas = this.canvasRef.current;
        const context = canvas.getContext('2d');
        
        context.fillStyle = color;

        switch(shape){
            case 'circle':
                context.beginPath();
                context.arc(pos.x, pos.y, 30, 0, 2 * Math.PI);
                context.fill();
                break;
            case 'square':
                context.fillRect(pos.x1, pos.y1, pos.x2, pos.y2);
                break;
            case 'star':
                context.save();
                context.beginPath();
                context.translate(pos.x, pos.y);
                context.moveTo(0, -15);
                for (var i = 0; i < 5; i++) {
                    context.rotate(Math.PI / 5);
                    context.lineTo(0, -(15 * 2.5));
                    context.rotate(Math.PI / 5);
                    context.lineTo(0, -15);
                }
                context.closePath();
                context.fill();
                context.restore();
                break;
        }
    }

    undo = () => {
        const canvas = this.canvasRef.current;
        const context = canvas.getContext('2d');

        let newStrokes = this.state.strokes;
        let newRedoQueue = this.state.redoQueue;
        newRedoQueue.push(newStrokes.pop());
        this.setState(
            {
                'strokes': newStrokes,
                'redoQueue': newRedoQueue
            }
        );
    }

    redo = () => {
        const canvas = this.canvasRef.current;
        const context = canvas.getContext('2d');

        let newStrokes = this.state.strokes;
        let newRedoQueue = this.state.redoQueue;
        let redoneAction = newRedoQueue.pop();

        if(redoneAction) {
            newStrokes.push(redoneAction);
            this.setState(
                {
                    'strokes': newStrokes,
                    'redoQueue': newRedoQueue
                }
            );
        }
    }

    clearCanvas = () => {
        const canvas = this.canvasRef.current;
        const context = canvas.getContext('2d');
        this.setState(
            {
                'strokes': [],
                'redoQueue': []
            }
        );
    }

    updateCanvas = () => {
        const canvas = this.canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        this.state.strokes.forEach(
            el => {
                this.drawShape(el.pos, el.shape, el.color);
            }
        );

        this.previewRef.current.style.backgroundImage = `url(${canvas.toDataURL()})`;
    }

    downloadCanvas = () => {
        const canvas = this.canvasRef.current;

        const link = document.createElement('a');
        link.download = 'canvas.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
        link.remove();
    }

    handleClick = event => {
        const target = event.currentTarget;
        const context = target.getContext('2d');

        const rect = target.getBoundingClientRect();
        const [x, y] = [event.clientX - rect.left, event.clientY - rect.top];
        
        const size = 50;
        let pos;
        switch(globalThis.currentShape) {
            case 'circle':
            case 'star':
                pos = {
                    'x': x,
                    'y': y,
                }
                break;
            case 'square':
                pos = {
                    'x1': x - size / 2,
                    'y1': y - size / 2,
                    'x2': size,
                    'y2': size, 
                }
        }

        let newStrokes = this.state.strokes;
        newStrokes.push({
            'pos': pos,
            'shape': globalThis.currentShape,
            'color': globalThis.currentColor
        });

        this.setState(
            {
                'strokes': newStrokes,
                'redoQueue': []
            }
        );
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    render() {
        return (
            <Main>
                <MainWrapper>
                    <Canvas
                        height='500'
                        width='500'
                        onClick={this.handleClick}
                        ref={this.canvasRef}
                    />
                    <MainWrapperInner>
                        <Deck
                            strokes={this.state.strokes}
                            currentShape={this.currentShape}
                            currentColor={this.currentColor}
                            clearCanvas={this.clearCanvas}
                            downloadCanvas={this.downloadCanvas}
                            undo={this.undo}
                            redo={this.redo}
                        />
                    </MainWrapperInner>
                </MainWrapper>
                <Preview
                    ref={this.previewRef}
                />
            </Main>
        )
    }
}


const Main = styled.main`
    display: flex;
    gap: 3rem;
`;

const MainWrapper = styled.div`
    width: 50rem;
`;

const MainWrapperInner = styled.div``;

const Canvas = styled.canvas`
    background: white;
    display: block;
    height: 50rem;
    width: 50rem;
`;

const Preview = styled.div`
    background: white;
    display: block;
    height: 50rem;
    width: 50rem;

    background-size: 25%;
`;


export default App;
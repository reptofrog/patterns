import React from 'react';
import styled, { css } from 'styled-components';


class Deck extends React.Component {
    setColor = ev => {
        const target = ev.currentTarget;
        globalThis.currentColor = target.getAttribute('color');
    }

    setShapeType = shape => {
        globalThis.currentShape = shape;
        this.forceUpdate();
    } 

    render() {
        return (
            <Wrapper>
                <WrapperInner>
                    <WrapperButtons>
                        <WrapperButtonsInner>
                            <Button
                                {...(globalThis.currentShape == 'circle' ? {selected: true} : {})}
                                onClick={e => {this.setShapeType('circle')}}
                            >
                                Circle
                            </Button>
                            <Button
                                {...(globalThis.currentShape == 'square' ? {selected: true} : {})}
                                onClick={e => {this.setShapeType('square')}}
                            >
                                Square
                            </Button>
                            <Button
                                {...(globalThis.currentShape == 'star' ? {selected: true} : {})}
                                onClick={e => {this.setShapeType('star')}}
                            >
                                Star
                            </Button>
                        </WrapperButtonsInner>
                        <WrapperButtonsInner>
                            <Button onClick={this.props.undo}>Undo</Button>
                            <Button onClick={this.props.redo}>Redo</Button>
                        </WrapperButtonsInner>
                    </WrapperButtons>
                    <WrapperButtons pushedToEnd>
                        <Button
                            onClick={this.props.clearCanvas}
                            destructive
                        >
                            Erase all
                        </Button>
                        <Button
                            onClick={this.props.downloadCanvas}
                            suggested>
                            Download
                        </Button>
                    </WrapperButtons>
                    <WrapperButtons colors>
                        <ButtonColor
                            onClick={this.setColor}
                            color='#FF77D9'
                        />
                        <ButtonColor
                            onClick={this.setColor}
                            color='#FF5C00'
                        />
                        <ButtonColor
                            onClick={this.setColor}
                            color='#E01B24'
                        />
                        <ButtonColor
                            onClick={this.setColor}
                            color='#77767B'
                        />
                        <ButtonColor
                            onClick={this.setColor}
                            color='#3D3846'
                        />
                        <ButtonColor
                            onClick={this.setColor}
                            color='#AD1BE0'
                        />
                        <ButtonColor
                            onClick={this.setColor}
                            color='#FFEB38'
                        />
                        <ButtonColor
                            onClick={this.setColor}
                            color='#55C15F'
                        />
                        <ButtonColor
                            onClick={this.setColor}
                            color='#C0BFBC'
                        />
                        <ButtonColor
                            onClick={this.setColor}
                            color='#241F31'
                        />
                        <ButtonColor
                            onClick={this.setColor}
                            color='#1F1BE0'
                        />
                        <ButtonColor
                            onClick={this.setColor}
                            color='#6AEAF2'
                        />
                        <ButtonColor
                            onClick={this.setColor}
                            color='#8FF0A4'
                        />
                        <ButtonColor
                            onClick={this.setColor}
                            color='#E9E6E6'
                        />
                        <ButtonColor
                            onClick={this.setColor}
                            color='#000000'
                        />
                    </WrapperButtons>
                </WrapperInner>                
            </Wrapper>
        )
    }
}


const Wrapper = styled.div`
    background: #E2E2E2;
    border-radius: 0 0 1.3rem 1.3rem;
    height: 8.2rem;
    padding: 0.8rem;
`;

const WrapperInner = styled.div`
    display: flex;
    height: 100%;
`;

const WrapperButtons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${props => props.pushedToEnd && css`
            & {
                align-items: end;
                margin-inline-start: auto;
            }
        `
    }

    ${props => props.colors && css`
            & {
                display: grid;
                gap: 0.3rem;
                grid-template-columns: repeat(5, 1fr);
                margin: -0.6rem -0.6rem -0.6rem 1.6rem;
            }
        `
    }
`;

const Button = styled.div`
    background: white;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1.6rem;
    font-weight: 600;
    outline: solid 0.2rem rgba(0, 0, 0, 0);
    padding: 0.3rem 0.8rem;
    transition: 0.04s cubic-bezier(0.55, 0.385, 0.355, 1);
    user-select: none;
    width: max-content;

    ${props => !props.selected && css`
            &:hover {
                outline: solid 0.2rem #3584E4;
                outline-offset: 0.2rem;
                z-index: 1;
            }
            &:active {
                outline-offset: 0rem;
                outline-color: rgba(0, 0, 0, 0);
                transform: translateY(0.2rem);
            }
        `
    }

    ${props => props.selected && css`
            & {
                background: #7F7F7F;
                color: white;
            }
        `
    }

    ${props => props.suggested && css`
            & {
                background: #3584E4;
                color: white;
            }
        `
    }

    ${props => props.destructive && css`
            & {
                background: #E01B24;
                color: white;
            }
        `
    }
`;

const WrapperButtonsInner = styled.div`
    display: flex;
    gap: 0.2rem;

    & ${Button} {
        border-radius: 0rem;
    }

    & ${Button}:first-child {
        border-radius: 0.5rem 0 0 0.5rem;
    }

    & ${Button}:last-child {
        border-radius: 0rem 0.5rem 0.5rem 0;
    }
`;

const ButtonColor = styled.div`
    background: ${props => props.color};
    border-radius: 100rem;
    border: solid 0.2rem white;
    cursor: pointer;
    height: 2.4rem;
    outline: solid 0.2rem rgba(0, 0, 0, 0);
    width: 2.4rem;

    outline-offset: -0.2rem;

    &:hover {
        outline: solid 0.2rem #3584E4;
        transition: 0.04s cubic-bezier(0.55, 0.385, 0.355, 1);
        z-index: 1;

        outline-offset: 0rem;
    }

    &:active {
        transform: translateY(0.2rem);
    }
`;


export default Deck;
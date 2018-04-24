import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { RegisterBody } from './RegisterBody';
import { alertActions } from '../_actions';
import { connect } from 'react-redux';

export class Registeration extends React.Component<any, any>
{
    constructor(props: any) {
        super(props);
    }
    public render(): any {
        return (
            <div style={{ textAlign: 'center' }}>
                <RegisterBody/>
            </div>
        )
    }
}
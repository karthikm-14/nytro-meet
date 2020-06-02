import React, { useEffect, useState } from 'react'
import API from '../../utils/api';
import EventView from './EventView';
import { getAllByDisplayValue } from '@testing-library/react';


const StageListView = (props) => {

    const items = props.stages.length && props.stages.map(stage => {
                if(stage.events.length) {
                    return <div key={stage.id} className="card mg-0-f col-md-4">
                            <h6 className="mg-b-10 tx-16 tx-normal">{ stage['stage-title'] }</h6>
                            <div className="card mg-0-f">
                                <EventView events={ stage.events } />
                            </div>
                        </div>
                }
            })

    return (
        <div className="row row-xs mg-t-35">
            <div className="col-12">
                <div className="card-deck row-xs">
                   { items }
                </div>
            </div>
        </div>
    )
}

export default StageListView

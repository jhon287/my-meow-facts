import { useState } from "react";
import React from "react";
import '../styles/Fact.css';

interface FactData {
    data: string[]
}

async function fetchFactData(): Promise<String | undefined> {
    const url: string = "https://meowfacts.herokuapp.com/";
    const config: RequestInit = {}

    return fetch(url, config)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then((data: FactData) => {
            return data.data.pop();
        })
}

export default function Fact() {
    const [fact, setFact] = 
        useState<String>("Click on button below to get meow fact...");
    
    function displayFact() {
        fetchFactData()
            .then(data => {
                if (data !== undefined) { setFact(data) }
            })
    }

    return (
        <div>
            <div className="Fact">
                <h2>{fact}</h2>
            </div>
            <button title="New Meow Fact" onClick={displayFact}>New Meow Fact</button>
        </div>
    )
}

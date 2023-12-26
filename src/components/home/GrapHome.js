import React, {useEffect, useState} from 'react';
import Card from '../card/Card'
import { gql } from '@apollo/client';
import { useQuery } from "@apollo/client";

export default function  GraphHome() {
    let query = gql`
        {
            query {
                characters(page: 2, filter: { name: "rick" }) {
                    info {
                        count
                    }
                    results {
                        name
                    }
                }
                location(id: 1) {
                    id
                }
                episodesByIds(ids: [1, 2]) {
                    id
                }
            }
        }
    `
   let res = useQuery(query)
    console.log(res)

    return(
     <Card
     //rightClick={addFav}

     />
    );
}
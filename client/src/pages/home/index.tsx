import {  Button, Card, Heading, HStack, Show, Table, VStack } from '@chakra-ui/react'
import { useMutation } from '@client/api/mutation'
import { useQuery } from '@client/api/query'
import { Avatar } from '@client/components/ui/avatar'
import React, { useCallback } from 'react'
import { hello$, mutation$, query$ } from 'types/graphql/fetchers'

const helloFetcher = hello$.id.createdAt.createdBy.description.title
const qry = query$.hellos(helloFetcher)

const mut = mutation$.helloCreate(helloFetcher)

export const Home = ()=>{
    const {mutate, data:created} = useMutation(mut)

    const {data,loading,stale } = useQuery(qry,{
        variables:{
            id:'1234'
        }
    })

    const create = useCallback(()=>{
            mutate({content:{
                title: 'title',
                description: 'description'
            }})
    }, [])

    return <VStack>
        <Heading>Loading: {`${loading}`}</Heading>
        <Heading>Stale: {`${stale}`}</Heading>

        <Heading>Created: {`${!!created?.helloCreate}`}</Heading>

        <HStack w={'full'} wrap={'wrap'}>

        <Button variant={'solid'} onClick={create}>Click</Button>
        <Button variant={'ghost'} onClick={create}>Click</Button>
        <Button variant={'outline'} onClick={create}>Click</Button>
        <Button variant={'subtle'} onClick={create}>Click</Button>
        <Button variant={'surface'} onClick={create}>Click</Button>

        <Card.Root width="320px">
        <Card.Body gap="2">
            <Avatar
            src="https://picsum.photos/200/300"
            name="Nue Camp"
            size="lg"
            shape="rounded"
            />
            <Card.Title mt="2">Nue Camp</Card.Title>
            <Card.Description>
            This is the card body. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
            Curabitur nec odio vel dui euismod fermentum.
            </Card.Description>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
            <Button variant="outline">View</Button>
            <Button>Join</Button>
        </Card.Footer>
        </Card.Root>

        <Show when={!!created?.helloCreate}>
                    <Card.Root width="320px">
        <Card.Body gap="2">
            <Avatar
            src="https://avatar.iran.liara.run/public"
            size="lg"
            />
            <Card.Title mt="2">{created?.helloCreate?.title}</Card.Title>
            <Card.Description>
            {created?.helloCreate?.description}
            </Card.Description>
        </Card.Body>
        </Card.Root>
        </Show>

        <Table.Root size="sm">
        <Table.Header>
            <Table.Row>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Created</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">CreatedBy</Table.ColumnHeader>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {data?.hellos?.map((item) => (
            <Table.Row key={item.id}>
                <Table.Cell>{item?.title}</Table.Cell>
                <Table.Cell>{item?.createdAt}</Table.Cell>
                <Table.Cell>{item?.description}</Table.Cell>
                <Table.Cell textAlign="end">{item.createdBy}</Table.Cell>
            </Table.Row>
            ))}
        </Table.Body>
        </Table.Root>
    </HStack>
    </VStack>
}


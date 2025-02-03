import {  Button, Card, HStack, Table } from '@chakra-ui/react'
import { Avatar } from '@client/components/ui/avatar'
import React from 'react'

export const Home = ()=>{
    return <HStack w={'full'} wrap={'wrap'}>
        <Button variant={'solid'}>Click</Button>
        <Button variant={'ghost'}>Click</Button>
        <Button variant={'outline'}>Click</Button>
        <Button variant={'subtle'}>Click</Button>
        <Button variant={'surface'}>Click</Button>

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

        <Table.Root size="sm">
        <Table.Header>
            <Table.Row>
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {items.map((item) => (
            <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell textAlign="end">{item.price}</Table.Cell>
            </Table.Row>
            ))}
        </Table.Body>
        </Table.Root>
    </HStack>
}


const items = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
    { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
    { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
    { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
    { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
  ]
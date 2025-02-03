import {  Badge, Fieldset, Input, Stack, VStack } from '@chakra-ui/react'
import { Field } from '@client/components/ui/field'
import React from 'react'

export const Hello = ()=>{
    return <VStack w={'full'}>
         <Stack direction="row">
            <Badge variant="outline">Outline</Badge>
            <Badge variant="solid">Solid</Badge>
            <Badge variant="subtle">Subtle</Badge>
            <Badge variant="surface">Surface</Badge>
        </Stack>

        <Fieldset.Root>
            <Fieldset.Legend> Formulario</Fieldset.Legend>
            <Fieldset.HelperText> Descrição formulario</Fieldset.HelperText>
            <Fieldset.Content>
                <Field label={'flushed'} >
                    <Input variant={'flushed'}/>
                </Field>

                <Field label={'outline'} >
                    <Input variant={'outline'}/>
                </Field>
                
                <Field label={'subtle'} >
                    <Input variant={'subtle'}/>
                </Field>

            </Fieldset.Content>
        </Fieldset.Root>
    </VStack>
}
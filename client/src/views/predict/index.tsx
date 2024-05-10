import { RepeatClockIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Center,
	Flex,
	Grid,
	GridItem,
	Heading,
	Input,
	InputGroup,
	InputRightAddon,
	Text,
	useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Route } from '../../config/const';
import { SwitchRouteButton } from '../../contexts/RouteContext';

export default function PredictPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const toast = useToast();
	const [predictedValue, setPredictedValue] = useState('');

	const onSubmit = async (data: object) => {
		try {
			const res = await fetch('http://178.16.138.2:7788/predict', {
				method: 'POST',
				mode: 'cors', // no-cors, *cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin',
				referrerPolicy: 'no-referrer',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!res.ok) {
				throw new Error();
			}
			const result = await res.json();
			const predicted_values = result.predicted;

			setPredictedValue(predicted_values.join(', '));
		} catch (err) {
			return toast({
				status: 'error',
				position: 'top',
				title: 'Unable to predict crop.',
			});
		}
	};

	return (
		<Center width={'100vw'} minH={'100vh'} flexDirection={'column'} className='bg-zinc-100'>
			<Heading mb={'1rem'} bgGradient='linear(to-r,#CA835B, #F4A15D, #CA835B)' bgClip='text'>
				Crop Recommendation System
			</Heading>
			<Box width={'fit-content'}>
				<form onSubmit={handleSubmit(onSubmit)} className='p-4 bg-white rounded-2xl'>
					<Grid className='grid-cols-1 md:grid-cols-3' columnGap={'2rem'} rowGap={'1rem'}>
						<GridItem>
							<Text mb='8px'>Ration of Nitrogen content in soil</Text>
							<Input
								id='n'
								width={'full'}
								rounded={'lg'}
								{...register('n', { required: true, min: 0, max: 140 })}
								placeholder='0 - 140'
								size='sm'
								isInvalid={!!errors.n}
							/>
						</GridItem>

						<GridItem>
							<Text mb='8px'>Ration of Phosphorous content in soil</Text>
							<Input
								id='p'
								width={'full'}
								rounded={'lg'}
								{...register('p', { required: true, min: 5, max: 145 })}
								placeholder='5 - 145'
								size='sm'
								isInvalid={!!errors.p}
							/>
						</GridItem>

						<GridItem>
							<Text mb='8px'>Ration of Potassium content in soil</Text>
							<Input
								id='k'
								width={'full'}
								rounded={'lg'}
								{...register('k', { required: true, min: 5, max: 205 })}
								placeholder='5 - 205'
								size='sm'
								isInvalid={!!errors.k}
							/>
						</GridItem>

						<GridItem>
							<Text mb='8px'>Temperature in degree Celsius</Text>

							<InputGroup size='sm'>
								<Input
									id='temperature'
									width={'full'}
									rounded={'lg'}
									{...register('temperature', { required: true, min: 8.8, max: 43.6 })}
									placeholder='8.8 - 43.6'
									size='sm'
									isInvalid={!!errors.temperature}
								/>
								<InputRightAddon>
									<sup>º</sup>C
								</InputRightAddon>
							</InputGroup>
						</GridItem>

						<GridItem>
							<Text mb='8px'>Relative humidity</Text>
							<InputGroup size='sm'>
								<Input
									id='humidity'
									width={'full'}
									rounded={'lg'}
									{...register('humidity', { required: true, min: 14.25, max: 99.9 })}
									placeholder='14.25 - 99.9'
									size='sm'
									isInvalid={!!errors.humidity}
								/>
								<InputRightAddon>%</InputRightAddon>
							</InputGroup>
						</GridItem>

						<GridItem>
							<Text mb='8px'>pH value of Soil</Text>
							<Input
								id='ph'
								width={'full'}
								rounded={'lg'}
								{...register('ph', { required: true, min: 3.5, max: 9.93 })}
								placeholder='3.50 - 9.93'
								size='sm'
								isInvalid={!!errors.ph}
							/>
						</GridItem>

						<GridItem>
							<Text mb='8px'>Rainfall in mm</Text>
							<Input
								id='rainfall'
								width={'full'}
								rounded={'lg'}
								{...register('rainfall', { required: true, min: 20.21, max: 298.5 })}
								placeholder='20.21 - 298.5'
								size='sm'
								isInvalid={!!errors.rainfall}
							/>
						</GridItem>
						<GridItem>
							<Text mb='8px'>Best suitable crop</Text>
							<Box width={'full'} rounded={'lg'} bgColor={'green'} py='0.25rem' px='1rem'>
								<Text textTransform={'capitalize'} color={'white'} fontWeight={'medium'}>
									{predictedValue || 'Predicted Crop'}
								</Text>
							</Box>
						</GridItem>
					</Grid>
					<Flex marginTop={'2rem'} justifyContent={'center'} gap={'1rem'}>
						<Button px={'3rem'} colorScheme='blue' type='submit'>
							Predict
						</Button>
						<Button
							borderColor={'#891618'}
							variant={'outline'}
							py='0.5rem'
							px='1rem'
							rounded={'md'}
							type='reset'
						>
							<RepeatClockIcon fontSize={'1.1rem'} color='#891618' />
						</Button>
					</Flex>
				</form>
				<Flex marginTop={'2rem'}>
					<SwitchRouteButton to={Route.CONTRIBUTE} colorScheme='purple' mx={'auto'}>
						Contribute to us
					</SwitchRouteButton>
				</Flex>
			</Box>
		</Center>
	);
}

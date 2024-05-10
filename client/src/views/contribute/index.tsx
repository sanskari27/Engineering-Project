import { RepeatClockIcon, TriangleDownIcon } from '@chakra-ui/icons';
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
	Select,
	Text,
	useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Route } from '../../config/const';
import { SwitchRouteButton } from '../../contexts/RouteContext';

export default function ContributePage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const toast = useToast();

	const onSubmit = async (data: object) => {
		try {
			const res = await fetch('http://178.16.138.2:7788/add-to-dataset', {
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
			if (!result.success) {
				throw new Error();
			}

			toast({
				status: 'success',
				position: 'top',
				title: 'Thanks for your contribution.',
			});
			reset();
		} catch (err) {
			return toast({
				status: 'error',
				position: 'top',
				title: 'Unable to contribute.',
			});
		}
	};

	return (
		<Center width={'100vw'} minH={'100vh'} flexDirection={'column'} className='bg-zinc-100'>
			<Heading mb={'1rem'} bgGradient='linear(to-r,#CA835B, #F4A15D, #CA835B)' bgClip='text'>
				Crop Recommendation System
			</Heading>
			<Text mb={'1rem'} fontSize={'xl'} fontWeight={'medium'}>
				Contribute to us
			</Text>
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
							<Text mb='8px'>Select crop</Text>
							<Select
								id='label'
								width={'full'}
								rounded={'lg'}
								{...register('label', { required: true, min: 20.21, max: 298.5 })}
								size='sm'
								isInvalid={!!errors.label}
								icon={<TriangleDownIcon fontSize={'0.65rem'} />}
								placeholder='Select a crop...'
							>
								<option value={'rice'}>Rice</option>
								<option value={'maize'}>Maize</option>
								<option value={'chickpea'}>Chickpea</option>
								<option value={'kidneybeans'}>Kidney Beans</option>
								<option value={'pigeonpeas'}>Pigeon Peas</option>
								<option value={'mothbeans'}>Moth Beans</option>
								<option value={'blackgram'}>Black Gram</option>
								<option value={'lentil'}>Lentil</option>
								<option value={'pomegranate'}>Pomegranate</option>
								<option value={'banana'}>Banana</option>
								<option value={'mongo'}>Mongo</option>
								<option value={'grapes'}>Grapes</option>
								<option value={'watermelon'}>Watermelon</option>
							</Select>
						</GridItem>
					</Grid>
					<Flex marginTop={'2rem'} justifyContent={'center'} gap={'1rem'}>
						<Button px={'3rem'} colorScheme='blue' type='submit'>
							Contribute
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
					<SwitchRouteButton to={Route.PREDICT} colorScheme='purple' mx={'auto'}>
						Predict Crop
					</SwitchRouteButton>
				</Flex>
			</Box>
		</Center>
	);
}

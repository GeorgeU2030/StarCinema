export class CreateRoomDto {
	readonly name: string;
	readonly seats: number;
	readonly isAvailable: boolean;
}

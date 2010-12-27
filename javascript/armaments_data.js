var ArmamentsData =
{
	minigun:
	{
		name: 'Minigun',
		cost: 1,
		slots: 1,
		attack_die: 6,
		damage_index: 0,
		short_range: 2,
		medium_range: 5,
		long_range: 12,
		ammo:
		{
			min: 4,
			max: 8,
			add: 2,
			cost: 0,
			slots: 1
		},
		multiples:
		{
			2:
			{
				cost_bonus: 1,
				slots_bonus: 0,
				ammo:
				{
					min: 4,
					max: 8,
					add: 2,
					cost: 1,
					slots: 1
				}
			},
			3:
			{
				cost_bonus: 2,
				slots_bonus: 1,
				ammo:
				{
					min: 4,
					max: 8,
					add: 2,
					cost: 2,
					slots: 1
				}
			},
			4:
			{
				cost_bonus: 3,
				slots_bonus: 2,
				ammo:
				{
					min: 4,
					max: 8,
					add: 2,
					cost: 2,
					slots: 2
				}
			}
		},
		note: 'Whenever two of the attack dice roll doubles, multiply the base damage by 2.'
	},
	autocannon:
	{
		name: 'Autocannon',
		cost: 2,
		slots: 2,
		attack_die: 6,
		damage_index: 1,
		short_range: 3,
		medium_range: 10,
		long_range: 24,
		ammo:
		{
			min: 4,
			max: 8,
			add: 2,
			cost: 1,
			slots: 1
		},
		speed_restriction: 10,
		multiples:
		{
			2:
			{
				cost_bonus: 2,
				slots_bonus: 1,
				ammo:
				{
					min: 4,
					max: 8,
					add: 1,
					cost: 1,
					slots: 1
				}
			},
			4:
			{
				cost_bonus: 6,
				slots_bonus: 4,
				ammo:
				{
					min: 4,
					max: 8,
					add: 1,
					cost: 2,
					slots: 2
				}
			}
		},
		note: 'Whenever two of the attack dice roll doubles, multiply the base damage by 2.'
	},
	railrepeator:
	{
		name: 'Railrepeator',
		cost: 8,
		slots: 8,
		attack_die: 6,
		damage_index: 2,
		short_range: 4,
		medium_range: 15,
		long_range: 36,
		ammo:
		{
			min: 4,
			max: 8,
			add: 1,
			cost: 2,
			slots: 2
		},
		speed_restriction: 6,
		note: 'Whenever two of the attack dice roll doubles, multiply the base damage by 2.'
	},
	pulselaser:
	{
		name: 'Pulse Laser',
		cost: 1,
		slots: 1,
		attack_die: 8,
		damage_index: 0,
		short_range: 3,
		medium_range: 9,
		long_range: 10,
		multiples:
		{
			2:
			{
				cost_bonus: 1,
				slots_bonus: 0
			},
			3:
			{
				cost_bonus: 2,
				slots_bonus: 1
			},
			4:
			{
				cost_bonus: 3,
				slots_bonus: 2
			},
			5:
			{
				cost_bonus: 4,
				slots_bonus: 3
			},
			6:
			{
				cost_bonus: 5,
				slots_bonus: 4
			}
		}
	},
	meldlaser:
	{
		name: 'Meld Laser',
		cost: 2,
		slots: 2,
		attack_die: 8,
		damage_index: 1,
		short_range: 6,
		medium_range: 18,
		long_range: 20,
		speed_restriction: 12,
		multiples:
		{
			2:
			{
				cost_bonus: 2,
				slots_bonus: 2
			}
		}
	},
	turbolaser:
	{
		name: 'Turbo Laser',
		cost: 5,
		slots: 5,
		attack_die: 8,
		damage_index: 2,
		short_range: 9,
		medium_range: 25,
		long_range: 30,
		speed_restriction: 8
	},
	splattergun:
	{
		name: 'Splattergun',
		cost: 1,
		slots: 1,
		attack_die: 6,
		damage_index: 1,
		short_range: 2,
		medium_range: 6,
		long_range: 10,
		multiples:
		{
			2:
			{
				cost_bonus: 3,
				slots_bonus: 1
			},
			4:
			{
				cost_bonus: 9,
				slots_bonus: 5
			},
			6:
			{
				cost_bonus: 15,
				slots_bonus: 9
			}
		},
		damage_bonus_multiplier: 2
	},
	blatgun:
	{
		name: 'Blatgun',
		cost: 3,
		slots: 3,
		attack_die: 6,
		damage_index: 2,
		short_range: 4,
		medium_range: 10,
		long_range: 15,
		speed_restriction: 13,
		multiples:
		{
			2:
			{
				cost_bonus: 5,
				slots_bonus: 3
			},
			4:
			{
				cost_bonus: 15,
				slots_bonus: 12
			},
			6:
			{
				cost_bonus: 21,
				slots_bonus: 17
			}
		},
		damage_bonus_multiplier: 2
	},
	disruptorgun:
	{
		name: 'Disruptorgun',
		cost: 2,
		slots: 1,
		attack_die: 8,
		damage_index: 1,
		short_range: 1,
		medium_range: 2,
		long_range: 6,
		multiples:
		{
			2:
			{
				cost_bonus: 2,
				slots_bonus: 2
			}
		},
		note: 'If the target\'s Defensive Value has not been reduced by a critical hit, add 1 to its Defensive Value. Also, completely ignore the target\'s Damage Reduction when resolving a hit.'
	},
	disintegrator:
	{
		name: 'Disintegrator',
		cost: 4,
		slots: 4,
		attack_die: 8,
		damage_index: 2,
		short_range: 1,
		medium_range: 3,
		long_range: 12,
		speed_restriction: 11,
		note: 'If the target\'s Defensive Value has not been reduced by a critical hit, add 1 to its Defensive Value. Also, completely ignore the target\'s Damage Reduction when resolving a hit.'
	},
	impulsegun:
	{
		name: 'Impulsegun',
		cost: 2,
		slots: 2,
		attack_die: 8,
		damage_index: 2,
		short_range: 3,
		medium_range: 8,
		long_range: 10
	},
	ionram:
	{
		name: 'Ion Ram',
		cost: 7,
		slots: 6,
		attack_die: 8,
		damage_index: 3,
		short_range: 5,
		medium_range: 13,
		long_range: 15,
		speed_restriction: 15
	},
	plazgun:
	{
		name: 'Plazgun',
		cost: 10,
		slots: 10,
		attack_die: 6,
		damage_index: 3,
		short_range: 2,
		medium_range: 4,
		long_range: 10,
		note: 'If the attack dice roll triples, the weapon mount overloads and is destroyed. The target is not affected.'
	},
	heavyplazgun:
	{
		name: 'Heavy Plazgun',
		cost: 20,
		slots: 20,
		attack_die: 6,
		damage_index: 4,
		short_range: 4,
		medium_range: 8,
		long_range: 15,
		speed_restriction: 11,
		note: 'If the attack dice roll triples, the weapon mount overloads and is destroyed. The target is not affected.'
	},
	protobolt:
	{
		name: 'Protobolt',
		cost: 3,
		slots: 2,
		attack_die: 6,
		damage_index: 5,
		short_range: 8,
		medium_range: 12,
		long_range: 16,
		ammo:
		{
			min: 1,
			max: 8,
			add: 1,
			cost: 1,
			slots: 1
		},
		speed_restriction: 14
	},
	missilelauncher5:
	{
		name: 'Missile Launcher (5)',
		cost: 1,
		slots: 1,
		attack_die: 6,
		number_of_attack_dice: 5,
		damage_index: 6,
		medium_range: 10,
		note: 'Lock-on roll required to launch.'
	},
	missilelauncher10:
	{
		name: 'Missile Launcher (10)',
		cost: 2,
		slots: 1,
		attack_die: 6,
		number_of_attack_dice: 10,
		damage_index: 6,
		medium_range: 10,
		note: 'Lock-on roll required to launch.'
	},
	missilelauncher15:
	{
		name: 'Missile Launcher (15)',
		cost: 3,
		slots: 2,
		attack_die: 6,
		number_of_attack_dice: 15,
		damage_index: 6,
		medium_range: 10,
		note: 'Lock-on roll required to launch.'
	},
	missilelauncher20:
	{
		name: 'Missile Launcher (20)',
		cost: 4,
		slots: 2,
		attack_die: 6,
		number_of_attack_dice: 20,
		damage_index: 6,
		medium_range: 10,
		note: 'Lock-on roll required to launch.'
	}
};

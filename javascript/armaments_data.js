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
		ammo: 4,
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
			}
		}
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
		ammo: 4,
		speed_restriction: 10,
		multiples:
		{
			2:
			{
				cost_bonus: 2,
				slots_bonus: 1
			},
			4:
			{
				cost_bonus: 6,
				slots_bonus: 4
			}
		}
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
		ammo: 4,
		speed_restriction: 6
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
			},
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
		}
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
		speed_restriction: 11
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
		long_range: 10
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
		speed_restriction: 11
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
		ammo: 1,
		speed_restriction: 14
	}
};

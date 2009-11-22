var ArmamentsData =
{
	minigun:
	{
		name: 'Minigun',
		cost: 1,
		slots: 1,
		attack_die: 6,
		damage_index: 0,
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
		ammo: 4,
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
		ammo: 4
	},
	pulselaser:
	{
		name: 'Pulse Laser',
		cost: 1,
		slots: 1,
		attack_die: 8,
		damage_index: 0,
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
		damage_index: 2
	},
	splattergun:
	{
		name: 'Splattergun',
		cost: 1,
		slots: 1,
		attack_die: 6,
		damage_index: 1,
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
		damage_index: 2
	},
	impulsegun:
	{
		name: 'Impulsegun',
		cost: 2,
		slots: 2,
		attack_die: 8,
		damage_index: 2,
		ammo: '-'
	},
	ionram:
	{
		name: 'Ion Ram',
		cost: 7,
		slots: 6,
		attack_die: 8,
		damage_index: 3,
		ammo: '-'
	},
	plazgun:
	{
		name: 'Plazgun',
		cost: 10,
		slots: 10,
		attack_die: 6,
		damage_index: 3,
		ammo: '-'
	},
	heavyplazgun:
	{
		name: 'Heavy Plazgun',
		cost: 20,
		slots: 20,
		attack_die: 6,
		damage_index: 4,
		ammo: '-'
	},
	protobolt:
	{
		name: 'Protobolt',
		cost: 3,
		slots: 2,
		attack_die: 6,
		damage_index: 5,
		ammo: 1
	}
};

var ShipOptionsData =
{
	pointdefense:
	{
		name: 'Point Defense',
		note: 'Use against missiles and torpedoes. Loses one attack for each critical suffered.',
		dimensions:
		[
			{
				name: 'Success (1d10)',
				spread: true
			},
			{
				name: 'Maximum attacks'
			}
		],
		data:
		{
			2:
			{
				1:
				{
					cost: 1,
					slots: 1
				},
				2:
				{
					cost: 2,
					slots: 1
				},
				3:
				{
					cost: 3,
					slots: 2
				},
				4:
				{
					cost: 4,
					slots: 2
				},
				5:
				{
					cost: 5,
					slots: 3
				},
				6:
				{
					cost: 6,
					slots: 3
				}
			},
			3:
			{
				1:
				{
					cost: 2,
					slots: 1
				},
				2:
				{
					cost: 3,
					slots: 2
				},
				3:
				{
					cost: 5,
					slots: 2
				},
				4:
				{
					cost: 6,
					slots: 3
				},
				5:
				{
					cost: 8,
					slots: 3
				},
				6:
				{
					cost: 9,
					slots: 4
				}
			},
			4:
			{
				1:
				{
					cost: 2,
					slots: 2
				},
				2:
				{
					cost: 4,
					slots: 2
				},
				3:
				{
					cost: 6,
					slots: 3
				},
				4:
				{
					cost: 8,
					slots: 3
				},
				5:
				{
					cost: 10,
					slots: 4
				},
				6:
				{
					cost: 12,
					slots: 4
				}
			},
			5:
			{
				1:
				{
					cost: 3,
					slots: 2
				},
				2:
				{
					cost: 5,
					slots: 3
				},
				3:
				{
					cost: 8,
					slots: 3
				},
				4:
				{
					cost: 10,
					slots: 4
				},
				5:
				{
					cost: 13,
					slots: 4
				},
				6:
				{
					cost: 15,
					slots: 5
				}
			},
			6:
			{
				1:
				{
					cost: 3,
					slots: 3
				},
				2:
				{
					cost: 6,
					slots: 3
				},
				3:
				{
					cost: 9,
					slots: 4
				},
				4:
				{
					cost: 12,
					slots: 4
				},
				5:
				{
					cost: 15,
					slots: 4
				},
				6:
				{
					cost: 18,
					slots: 5
				}
			},
			7:
			{
				1:
				{
					cost: 4,
					slots: 3
				},
				2:
				{
					cost: 7,
					slots: 4
				},
				3:
				{
					cost: 11,
					slots: 4
				},
				4:
				{
					cost: 14,
					slots: 5
				},
				5:
				{
					cost: 18,
					slots: 5
				},
				6:
				{
					cost: 21,
					slots: 6
				}
			},
			8:
			{
				1:
				{
					cost: 4,
					slots: 4
				},
				2:
				{
					cost: 8,
					slots: 4
				},
				3:
				{
					cost: 12,
					slots: 5
				},
				4:
				{
					cost: 16,
					slots: 5
				},
				5:
				{
					cost: 20,
					slots: 6
				},
				6:
				{
					cost: 24,
					slots: 6
				}
			}
		}
	},
	decoys:
	{
		name: 'Decoys',
		note: 'Use against torpedoes. Lose one decoy for each critical suffered.',
		dimensions:
		[
			{
				name: 'Number of decoys'
			}
		],
		data:
		{
			1:
			{
				cost: 1,
				slots: 0
			},
			2:
			{
				cost: 1,
				slots: 1
			},
			3:
			{
				cost: 2,
				slots: 1
			},
			4:
			{
				cost: 2,
				slots: 2
			},
			5:
			{
				cost: 3,
				slots: 2
			},
			6:
			{
				cost: 3,
				slots: 3
			}
		}
	},
	damagecontrol:
	{
		name: 'Damage Control',
		note: 'Limited field repairs, usable only at the end of a turn you did not fire or take fire.',
		dimensions:
		[
			{
				name: 'Success (1d10)',
				spread: true
			}
		],
		data:
		{
			2:
			{
				cost: 1,
				slots: 0
			},
			3:
			{
				cost: 2,
				slots: 1
			},
			4:
			{
				cost: 3,
				slots: 1
			},
			5:
			{
				cost: 4,
				slots: 2
			},
			6:
			{
				cost: 5,
				slots: 2
			},
			7:
			{
				cost: 6,
				slots: 3
			},
			8:
			{
				cost: 7,
				slots: 3
			}
		}
	}
};

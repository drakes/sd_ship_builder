var ConstructionTemplateData =
{
	light1pfighter:
	{
		50:
		{
			crew: 1,
			slots: 4,
			max_torps: 10,
			hit_boxes: 5,
			drive:
			{
				11: { cost: 1, slots: 0 },
				12: { cost: 1, slots: 1 },
				13: { cost: 1, slots: 1 },
				14: { cost: 1, slots: 1 },
				15: { cost: 2, slots: 1 },
				16: { cost: 2, slots: 1 },
				17: { cost: 2, slots: 1 },
				18: { cost: 2, slots: 1 },
				19: { cost: 2, slots: 1 },
				20: { cost: 3, slots: 3 }
			},
			defense:
			{
				11: { cost: 0, slots: 0 },
				12: { cost: 1, slots: 0 },
				13: { cost: 1, slots: 1 },
				14: { cost: 1, slots: 1 },
				15: { cost: 2, slots: 1 },
				16: { cost: 2, slots: 1 },
				17: { cost: 3, slots: 3 }
			},
			damage_reduction:
			{
				0: { cost: 0, slots: 0 },
				1: { cost: 0, slots: 1 },
				2: { cost: 1, slots: 1 },
				3: { cost: 1, slots: 2 },
				4: { cost: 1, slots: 3 },
				5: { cost: 2, slots: 3 }
			}
		},

		100:
		{
			crew: 1,
			slots: 9,
			max_torps: 10,
			hit_boxes: 10,
			drive:
			{
				11: { cost: 2, slots: 0 },
				12: { cost: 2, slots: 1 },
				13: { cost: 3, slots: 1 },
				14: { cost: 3, slots: 2 },
				15: { cost: 3, slots: 2 },
				16: { cost: 3, slots: 2 },
				17: { cost: 3, slots: 2 },
				18: { cost: 4, slots: 3 },
				19: { cost: 6, slots: 5 },
				20: { cost: 6, slots: 6 }
			},
			defense:
			{
				10: { cost: 0, slots: 0 },
				11: { cost: 2, slots: 0 },
				12: { cost: 2, slots: 1 },
				13: { cost: 3, slots: 1 },
				14: { cost: 3, slots: 2 },
				15: { cost: 3, slots: 2 },
				16: { cost: 5, slots: 5 },
				17: { cost: 6, slots: 5 }
			},
			damage_reduction:
			{
				0: { cost: 0, slots: 0 },
				1: { cost: 1, slots: 1 },
				2: { cost: 1, slots: 2 },
				3: { cost: 2, slots: 3 },
				4: { cost: 2, slots: 4 },
				5: { cost: 3, slots: 5 }
			}
		}
	},
	
	medium1pfighter:
	{
		200:
		{
			crew: 1,
			slots: 18,
			max_torps: 10,
			hit_boxes: 20,
			drive:
			{
				10: { cost: 4, slots: 2 },
				11: { cost: 4, slots: 2 },
				12: { cost: 5, slots: 2 },
				13: { cost: 5, slots: 3 },
				14: { cost: 6, slots: 3 },
				15: { cost: 6, slots: 4 },
				16: { cost: 6, slots: 4 },
				17: { cost: 7, slots: 5 },
				18: { cost: 11, slots: 8 },
				19: { cost: 12, slots: 9 },
				20: { cost: 12, slots: 10 }
			},
			defense:
			{
				6: { cost: 2, slots: 1 },
				7: { cost: 3, slots: 1 },
				8: { cost: 3, slots: 1 },
				9: { cost: 4, slots: 1 },
				10: { cost: 4, slots: 2 },
				11: { cost: 4, slots: 2 },
				12: { cost: 5, slots: 2 },
				13: { cost: 5, slots: 3 },
				14: { cost: 6, slots: 3 },
				15: { cost: 9, slots: 6 },
				16: { cost: 10, slots: 7 },
				17: { cost: 11, slots: 8 }
			},
			damage_reduction:
			{
				0: { cost: 0, slots: 0 },
				1: { cost: 1, slots: 2 },
				2: { cost: 2, slots: 4 },
				3: { cost: 3, slots: 6 },
				4: { cost: 4, slots: 8 },
				5: { cost: 5, slots: 10 }
			}
		},
		300:
		{
			crew: 1,
			slots: 28,
			max_torps: 10,
			hit_boxes: 30,
			drive:
			{
				10: { cost: 6, slots: 2 },
				11: { cost: 7, slots: 3 },
				12: { cost: 7, slots: 3 },
				13: { cost: 8, slots: 4 },
				14: { cost: 8, slots: 5 },
				15: { cost: 9, slots: 5 },
				16: { cost: 10, slots: 6 },
				17: { cost: 15, slots: 11 },
				18: { cost: 17, slots: 12 },
				19: { cost: 17, slots: 14 },
				20: { cost: 18, slots: 15 }
			},
			defense:
			{
				6: { cost: 4, slots: 1 },
				7: { cost: 4, slots: 1 },
				8: { cost: 5, slots: 2 },
				9: { cost: 5, slots: 2 },
				10: { cost: 6, slots: 2 },
				11: { cost: 7, slots: 3 },
				12: { cost: 7, slots: 3 },
				13: { cost: 8, slots: 4 },
				14: { cost: 12, slots: 8 },
				15: { cost: 14, slots: 8 },
				16: { cost: 15, slots: 9 },
				17: { cost: 15, slots: 11 }
			},
			damage_reduction:
			{
				0: { cost: 0, slots: 0 },
				1: { cost: 2, slots: 3 },
				2: { cost: 3, slots: 6 },
				3: { cost: 5, slots: 9 },
				4: { cost: 6, slots: 12 },
				5: { cost: 8, slots: 15 }
			}
		}
	},

	heavy1pfighter:
	{
		400:
		{
			crew: 1,
			slots: 38,
			max_torps: 10,
			hit_boxes: 40,
			drive:
			{
				10: { cost: 8, slots: 3 },
				11: { cost: 9, slots: 4 },
				12: { cost: 10, slots: 5 },
				13: { cost: 10, slots: 5 },
				14: { cost: 11, slots: 6 },
				15: { cost: 12, slots: 7 },
				16: { cost: 20, slots: 12 },
				17: { cost: 21, slots: 14 },
				18: { cost: 21, slots: 15 },
				19: { cost: 23, slots: 18 },
				20: { cost: 24, slots: 20 }
			},
			defense:
			{
				6: { cost: 5, slots: 1 },
				7: { cost: 6, slots: 2 },
				8: { cost: 6, slots: 2 },
				9: { cost: 7, slots: 3 },
				10: { cost: 8, slots: 3 },
				11: { cost: 9, slots: 4 },
				12: { cost: 10, slots: 5 },
				13: { cost: 15, slots: 8 },
				14: { cost: 17, slots: 9 },
				15: { cost: 18, slots: 11 },
				16: { cost: 20, slots: 12 },
				17: { cost: 21, slots: 14 }
			},
			damage_reduction:
			{
				0: { cost: 0, slots: 0 },
				1: { cost: 2, slots: 4 },
				2: { cost: 4, slots: 8 },
				3: { cost: 6, slots: 12 },
				4: { cost: 8, slots: 16 },
				5: { cost: 10, slots: 20 }
			}
		}
	},
	
	light2pfighter:
	{
		300:
		{
			crew: 2,
			slots: 25,
			max_torps: 15,
			hit_boxes: 30,
			drive:
			{
				10: { cost: 6, slots: 2 },
				11: { cost: 7, slots: 3 },
				12: { cost: 7, slots: 3 },
				13: { cost: 8, slots: 4 },
				14: { cost: 8, slots: 5 },
				15: { cost: 9, slots: 5 },
				16: { cost: 10, slots: 6 },
				17: { cost: 15, slots: 11 },
				18: { cost: 17, slots: 12 },
				19: { cost: 17, slots: 14 },
				20: { cost: 18, slots: 15 }
			},
			defense:
			{
				6: { cost: 4, slots: 1 },
				7: { cost: 4, slots: 1 },
				8: { cost: 5, slots: 2 },
				9: { cost: 5, slots: 2 },
				10: { cost: 6, slots: 2 },
				11: { cost: 7, slots: 3 },
				12: { cost: 7, slots: 3 },
				13: { cost: 8, slots: 4 },
				14: { cost: 12, slots: 8 },
				15: { cost: 14, slots: 8 },
				16: { cost: 15, slots: 9 },
				17: { cost: 15, slots: 11 }
			},
			damage_reduction:
			{
				0: { cost: 0, slots: 0 },
				1: { cost: 2, slots: 3 },
				2: { cost: 3, slots: 6 },
				3: { cost: 5, slots: 9 },
				4: { cost: 6, slots: 12 },
				5: { cost: 8, slots: 15 }
			}
		},
		400:
		{
			crew: 2,
			slots: 35,
			max_torps: 15,
			hit_boxes: 40,
			drive:
			{
				10: { cost: 8, slots: 3 },
				11: { cost: 9, slots: 4 },
				12: { cost: 10, slots: 5 },
				13: { cost: 10, slots: 5 },
				14: { cost: 11, slots: 6 },
				15: { cost: 12, slots: 7 },
				16: { cost: 20, slots: 12 },
				17: { cost: 21, slots: 14 },
				18: { cost: 21, slots: 15 },
				19: { cost: 23, slots: 18 },
				20: { cost: 24, slots: 20 }
			},
			defense:
			{
				6: { cost: 5, slots: 1 },
				7: { cost: 6, slots: 2 },
				8: { cost: 6, slots: 2 },
				9: { cost: 7, slots: 3 },
				10: { cost: 8, slots: 3 },
				11: { cost: 9, slots: 4 },
				12: { cost: 10, slots: 5 },
				13: { cost: 15, slots: 8 },
				14: { cost: 17, slots: 9 },
				15: { cost: 18, slots: 11 },
				16: { cost: 20, slots: 12 },
				17: { cost: 21, slots: 14 }
			},
			damage_reduction:
			{
				0: { cost: 0, slots: 0 },
				1: { cost: 2, slots: 4 },
				2: { cost: 4, slots: 8 },
				3: { cost: 6, slots: 12 },
				4: { cost: 8, slots: 16 },
				5: { cost: 10, slots: 20 }
			}
		}
	},
	
	light3pfighter:
	{
		400:
		{
			crew: 3,
			slots: 30,
			max_torps: 15,
			hit_boxes: 40,
			drive:
			{
				10: { cost: 8, slots: 3 },
				11: { cost: 9, slots: 4 },
				12: { cost: 10, slots: 5 },
				13: { cost: 10, slots: 5 },
				14: { cost: 11, slots: 6 },
				15: { cost: 12, slots: 7 },
				16: { cost: 20, slots: 12 },
				17: { cost: 21, slots: 14 },
				18: { cost: 21, slots: 15 },
				19: { cost: 23, slots: 18 },
				20: { cost: 24, slots: 20 }
			},
			defense:
			{
				6: { cost: 5, slots: 1 },
				7: { cost: 6, slots: 2 },
				8: { cost: 6, slots: 2 },
				9: { cost: 7, slots: 3 },
				10: { cost: 8, slots: 3 },
				11: { cost: 9, slots: 4 },
				12: { cost: 10, slots: 5 },
				13: { cost: 15, slots: 8 },
				14: { cost: 17, slots: 9 },
				15: { cost: 18, slots: 11 },
				16: { cost: 20, slots: 12 },
				17: { cost: 21, slots: 14 }
			},
			damage_reduction:
			{
				0: { cost: 0, slots: 0 },
				1: { cost: 2, slots: 4 },
				2: { cost: 4, slots: 8 },
				3: { cost: 6, slots: 12 },
				4: { cost: 8, slots: 16 },
				5: { cost: 10, slots: 20 }
			}
		}
	},

	medium2pfighter:
	{
		600:
		{
			crew: 2,
			slots: 55,
			max_torps: 15,
			hit_boxes: 60,
			drive:
			{
				10: { cost: 12, slots: 5 },
				11: { cost: 13, slots: 6 },
				12: { cost: 14, slots: 7 },
				13: { cost: 16, slots: 8 },
				14: { cost: 17, slots: 9 },
				15: { cost: 27, slots: 17 },
				16: { cost: 29, slots: 18 },
				17: { cost: 30, slots: 21 },
				18: { cost: 33, slots: 24 },
				19: { cost: 35, slots: 26 },
				20: { cost: 36, slots: 29 }
			},
			defense:
			{
				6: { cost: 7, slots: 2 },
				7: { cost: 8, slots: 2 },
				8: { cost: 10, slots: 3 },
				9: { cost: 11, slots: 4 },
				10: { cost: 12, slots: 5 },
				11: { cost: 13, slots: 6 },
				12: { cost: 14, slots: 7 },
				13: { cost: 24, slots: 12 },
				14: { cost: 26, slots: 14 },
				15: { cost: 27, slots: 17 },
				16: { cost: 29, slots: 18 },
				17: { cost: 30, slots: 21 }
			},
			damage_reduction:
			{
				0: { cost: 0, slots: 0 },
				1: { cost: 3, slots: 6 },
				2: { cost: 6, slots: 12 },
				3: { cost: 9, slots: 18 },
				4: { cost: 12, slots: 24 },
				5: { cost: 15, slots: 30 }
			}
		},
		700:
		{
			crew: 2,
			slots: 65,
			max_torps: 15,
			hit_boxes: 70,
			drive:
			{
				10: { cost: 14, slots: 6 },
				11: { cost: 15, slots: 7 },
				12: { cost: 17, slots: 8 },
				13: { cost: 18, slots: 9 },
				14: { cost: 30, slots: 17 },
				15: { cost: 32, slots: 20 },
				16: { cost: 33, slots: 21 },
				17: { cost: 36, slots: 24 },
				18: { cost: 38, slots: 27 },
				19: { cost: 41, slots: 30 },
				20: { cost: 42, slots: 33 }
			},
			defense:
			{
				6: { cost: 8, slots: 2 },
				7: { cost: 10, slots: 3 },
				8: { cost: 11, slots: 4 },
				9: { cost: 13, slots: 5 },
				10: { cost: 14, slots: 6 },
				11: { cost: 15, slots: 7 },
				12: { cost: 17, slots: 8 },
				13: { cost: 27, slots: 14 },
				14: { cost: 30, slots: 17 },
				15: { cost: 32, slots: 20 },
				16: { cost: 33, slots: 21 },
				17: { cost: 36, slots: 24 }
			},
			damage_reduction:
			{
				0: { cost: 0, slots: 0 },
				1: { cost: 4, slots: 7 },
				2: { cost: 7, slots: 14 },
				3: { cost: 11, slots: 21 },
				4: { cost: 14, slots: 28 },
				5: { cost: 18, slots: 35 }
			}
		}
	},

	medium3pfighter:
	{
	},

	heavy2pfighter:
	{
	},

	heavy3pfighter:
	{
	}
};

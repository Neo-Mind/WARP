function TestRun()
{
	let bite = 0x12;
	let word = 0x1234;
	let dwrd = 0x12345678;
	
	let argset =
	[
		// Immediate
		 bite ,
		 word ,
		 dwrd ,
// /*
		// Reg
		 BL   ,
		 BX   ,
		 EBX  ,
		 AL   ,
		 AX   ,
		 EAX  ,
		
		// Ptr [Disp]
		[bite],
		[word],
		[dwrd],
		
		// Ptr [Reg]
		[BX  ],
		[EBX ],
		[EAX ],
		[EBP ],
		
		// Ptr [Reg + disp]
		[BX  , bite],
		[EBX , bite],
		[BX  , word],
		[EBX , word],
		[EBX , dwrd],
		
		// Ptr [Reg + Reg]
		[BX  , DI ],
		[EBX , EDI],
		
		// Ptr [Reg + Reg + disp]
		[BX  , DI , bite],
		[EBX , EDI, bite],
		[BX  , DI , word],
		[EBX , EDI, word],
		[EBX , EDI, dwrd],
		
		// Ptr [scale*Reg]
		[4, EBX ],
		
		// Ptr [scale*Reg + disp]
		[4, EBX , bite],
		[4, EBX , word],
		[4, EBX , dwrd],
		
		// Ptr [scale*Reg + Reg]
		[4, EBX , EDI],
		
		// Ptr [scale*Reg + Reg + disp]
		[4, EBX , EDI, bite],
		[4, EBX , EDI, word],
		[4, EBX , EDI, dwrd],
// */
	];
	
	// argset.forEach( arg => 
	// {
		// console.info(MUL(arg));
	// });
	
	argset.forEach( arg1 =>
	{
		if (IsNum(arg1))
			return;
		
		argset.forEach( arg2 =>
		{
			if (Array.isArray(arg1) && Array.isArray(arg2))
				return;
			
			console.info(TEST(arg1, arg2));
		});
	});
}

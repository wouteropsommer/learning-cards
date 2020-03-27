using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using learningCardApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace learningCardApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardSetsController : ControllerBase
    {
        private readonly ICardSetRepository _cardSetRepository;

        public CardSetsController(ICardSetRepository context)
        {
            _cardSetRepository = context;
        }

        [HttpGet]
        public IEnumerable<CardSet> GetFolders()
        {
            return _cardSetRepository.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<CardSet> GetCardSet(int id)
        {
            CardSet cardSet = _cardSetRepository.GetBy(id);
            if (cardSet == null) return NotFound();
            return cardSet;
        }

        [HttpGet("{userId},{parent}")]
        public IEnumerable<CardSet> getCardSetWitchCorrectParent(int userId, int parent)
        {
            return _cardSetRepository.GetAll().Where(c => c.UserId == userId && c.Parent == parent);
        }

        [HttpPost]
        public ActionResult<CardSet> PostCardSet(CardSet cardSet)
        {
            _cardSetRepository.Add(cardSet);
            _cardSetRepository.SaveChanges();

            return CreatedAtAction(nameof(GetCardSet), new { id = cardSet.Id }, cardSet);
        }

        [HttpPut("{id}")]
        public IActionResult PutCardSet(int id, CardSet cardSet)
        {
            if (id != cardSet.Id)
            {
                return BadRequest();
            }
            _cardSetRepository.Update(cardSet);
            _cardSetRepository.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult<CardSet> DeleteCardSet(int id)
        {
            CardSet cardSet = _cardSetRepository.GetBy(id);
            if (cardSet == null)
            {
                return NotFound();
            }
            _cardSetRepository.Delete(cardSet);
            _cardSetRepository.SaveChanges();
            return cardSet;
        }




    }
}